import { router, procedure } from "@/server/trpc";
import { z } from "zod";
import { BuilderSDK } from "@buildersdk/sdk";
import DefaultProvider from "@/utils/DefaultProvider";
import parseBase64String from "@/utils/parseBase64String";
import getNormalizedURI from "@/utils/getNormalizedURI";
import { BigNumber } from "ethers";

const { token } = BuilderSDK.connect({ signerOrProvider: DefaultProvider });

export type TokenInfo = {
  name: string;
  image: string;
};

export type ContractInfo = {
  name: string;
  description?: string;
  image: string;
  external_url?: string;
  total_supply: string;
  auction: string;
};

const info = procedure
  .input(
    z.object({
      collectionAddress: z.string(),
      tokenId: z.string(),
    })
  )
  .query(async ({ input }) => {
    const tokenContract = token({
      address: input.collectionAddress,
    });

    const tokenURI = await tokenContract.tokenURI(
      BigNumber.from(input.tokenId)
    );
    return parseBase64String(tokenURI) as TokenInfo;
  });

const contract = procedure
  .input(
    z.object({
      collectionAddress: z.string(),
    })
  )
  .query(async ({ input }) => {
    const tokenContract = token({
      address: input.collectionAddress,
    });

    const [contractURI, total_supply, auction] = await Promise.all([
      tokenContract.contractURI(),
      tokenContract.totalSupply(),
      tokenContract.auction(),
    ]);

    const contractInfo = parseBase64String(contractURI);

    return {
      ...contractInfo,
      image: getNormalizedURI(contractInfo.image, {
        preferredIPFSGateway: process.env.NEXT_PUBLIC_IPFS_GATEWAY,
      }),
      total_supply: total_supply.toHexString(),
      auction,
    } as ContractInfo;
  });

export const tokenRouter = router({ info, contract });
