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

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<{
    tokenContract: string;
    tokenId: number;
    contract: ContractInfo;
    token: TokenInfo;
    auction: AuctionInfo;
    descriptionSource: MDXRemoteSerializeResult<Record<string, unknown>>;
  }>
> => {
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

  const templateDirectory = path.join(process.cwd(), "templates");
  const source = await fs.readFile(
    templateDirectory + "/home/description.mdx",
    "utf8"
  );
  const mdxSource = await serialize(source);

  return {
    props: {
      tokenContract,
      tokenId,
      contract,
      token,
      auction,
      descriptionSource: mdxSource,
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
      <div className="bg-skin-fill min-h-[92vh]">
        <Header />
        <Hero />
      </div>

      <div className="bg-skin-backdrop">
        <div className="h-full w-full wrapper focus:outline-none pt-12 p-6 px-52 prose prose-skin lg:prose-xl max-w-none">
          <MDXRemote {...descriptionSource} />
        </div>

        <Footer />
      </div>
    </SWRConfig>
  );
}
