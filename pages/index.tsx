import Header from "../components/Header";
import { useIsMounted } from "hooks/useIsMounted";
import { Fragment } from "react";
import Hero from "../components/Hero/Hero";
import { GetStaticPropsResult, InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { SWRConfig } from "swr";
import {
  ContractInfo,
  getContractInfo,
  getTokenInfo,
  TokenInfo,
} from "data/nouns-builder/token";
import { AuctionInfo, getCurrentAuction } from "data/nouns-builder/auction";
import { promises as fs } from "fs";
import path from "path";
import Footer from "@/components/Footer";
import FaqElement from "@/components/FaqElement";

type MarkdownSource = MDXRemoteSerializeResult<Record<string, unknown>>;

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<{
    tokenContract: string;
    tokenId: number;
    contract: ContractInfo;
    token: TokenInfo;
    auction: AuctionInfo;
    descriptionSource: MarkdownSource;
    faqSources: MarkdownSource[];
  }>
> => {
  // Get token and auction info
  const tokenContract = process.env.NEXT_PUBLIC_TOKEN_CONTRACT!;

  const contract = await getContractInfo({ address: tokenContract });

  const tokenId = parseInt(contract.total_supply) - 1;
  const [token, auction] = await Promise.all([
    getTokenInfo({
      address: tokenContract,
      tokenid: tokenId.toString(),
    }),
    getCurrentAuction({ address: contract.auction }),
  ]);

  // Get description and faq markdown

  const templateDirectory = path.join(process.cwd(), "templates");
  const descFile = await fs.readFile(
    templateDirectory + "/home/description.md",
    "utf8"
  );
  const descMD = await serialize(descFile);

  let faqSources: MarkdownSource[] = [];
  try {
    const faqFiles = await fs.readdir(templateDirectory + "/home/faq", {
      withFileTypes: true,
    });

    faqSources = await Promise.all(
      faqFiles
        .filter((dirent) => dirent.isFile())
        .map(async (file) => {
          const faqFile = await fs.readFile(
            templateDirectory + "/home/faq/" + file.name,
            "utf8"
          );

          return serialize(faqFile, { parseFrontmatter: true });
        })
    ).then((x) =>
      x.sort(
        (a, b) =>
          Number(a.frontmatter?.order || 0) - Number(b.frontmatter?.order || 0)
      )
    );
  } catch {
    //Do Nothing (no FAQ directory)
  }

  if (!contract.image) contract.image = "";

  return {
    props: {
      tokenContract,
      tokenId,
      contract,
      token,
      auction,
      descriptionSource: descMD,
      faqSources,
    },
    revalidate: 60,
  };
};

export default function SiteComponent({
  tokenContract,
  tokenId,
  contract,
  token,
  auction,
  descriptionSource,
  faqSources,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isMounted = useIsMounted();

  if (!isMounted) return <Fragment />;

  return (
    <SWRConfig
      value={{
        fallback: {
          [`/api/token/${tokenContract}`]: contract,
          [`/api/token/${tokenContract}/${tokenId}`]: token,
          [`/api/auction/${contract.auction}`]: auction,
        },
      }}
    >
      <div className="bg-skin-backdrop text-skin-base min-h-screen flex flex-col items-center justify-around">
        <div className="bg-skin-fill w-full flex items-center justify-around">
          <div className="max-w-[1400px]">
            <Header />
            <Hero />
          </div>
        </div>
        <div className="max-w-[1400px] w-full">
          <div>
            <div className="bg-skin-backdrop lg:px-24 xl:px-52 mt-8">
              <div className="h-full w-full wrapper focus:outline-none pt-12 p-6 break-words prose prose-skin prose-headings:font-heading lg:prose-xl max-w-none">
                <MDXRemote {...descriptionSource} />
              </div>

              <div className="pt-12 p-8 ">
                {faqSources.map((x, i) => (
                  <div key={i} className="mb-10">
                    <FaqElement
                      className={
                        "flex items-center font-semibold justify-between w-full text-left text-4xl font-heading text-skin-base hover:text-skin-highlighted"
                      }
                      title={x.frontmatter?.title || ""}
                    >
                      <div className="prose prose-skin prose-headings:font-heading break-words max-w-none mt-8">
                        <MDXRemote {...x} />
                      </div>
                    </FaqElement>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </SWRConfig>
  );
}
