import Header from "components/Header";
import { useIsMounted } from "hooks/useIsMounted";
import { Fragment } from "react";
import Hero from "components/Hero";
import prisma from "@/utils/prisma";
import { Site } from "@prisma/client";
import {
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from "next";
import Description from "@/components/Description";
import { remark } from "remark";
import html from "remark-html";
import { SWRConfig } from "swr";
import useAPIBaseURL from "@/hooks/useAPIBaseURL";
import {
  ContractInfo,
  getContractInfo,
  getTokenInfo,
  TokenInfo,
} from "@/services/nouns-builder/token";
import {
  AuctionInfo,
  getCurrentAuction,
} from "@/services/nouns-builder/auction";

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export const getStaticProps = async (
  context: GetStaticPropsContext<{ site: string }>
): Promise<
  GetStaticPropsResult<{
    tokenId: number;
    site: Site;
    contract: ContractInfo;
    token: TokenInfo;
    auction: AuctionInfo;
  }>
> => {
  const { site } = context.params!;

  const [siteInfo, contract] = await Promise.all([
    prisma.site.findFirst({
      where: { contract: site as string },
    }),
    getContractInfo({ address: site }),
  ]);

  const tokenId = parseInt(contract.total_supply) - 1;
  const [token, auction] = await Promise.all([
    getTokenInfo({
      address: site,
      tokenid: tokenId.toString(),
    }),
    getCurrentAuction({ address: contract.auction }),
  ]);

  if (siteInfo) {
    siteInfo.description = siteInfo?.description
      ? await remark()
          .use(html)
          .process(siteInfo?.description)
          .then((x) => x.toString())
      : null;
  }

  return {
    props: {
      tokenId,
      site: siteInfo ? JSON.parse(JSON.stringify(siteInfo)) : null,
      contract,
      token,
      auction,
    },
    revalidate: 60,
  };
};

export default function SiteComponent({
  tokenId,
  site,
  contract,
  token,
  auction,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const baseURL = useAPIBaseURL();
  const isMounted = useIsMounted();

  if (!isMounted) return <Fragment />;

  return (
    <SWRConfig
      value={{
        fallback: {
          [`${baseURL}/api/token/${site}`]: contract,
          [`${baseURL}/api/token/${site}/${tokenId}`]: token,
          [`${baseURL}/api/auction/${contract.auction}`]: auction,
        },
      }}
    >
      <Header />
      <Hero />
      {site?.description && (
        <div className="px-2 sm:px-32 mt-20">
          <Description html={site.description} />
        </div>
      )}
    </SWRConfig>
  );
}
