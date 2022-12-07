import { BuilderSDK } from "@buildersdk/sdk";
import DefaultProvider from "@/utils/DefaultProvider";
import parseBase64String from "@/utils/parseBase64String";
import getNormalizedURI from "@/utils/getNormalizedURI";
import { BigNumber } from "ethers";

const { token } = BuilderSDK.connect({ signerOrProvider: DefaultProvider });

export type ContractInfo = {
  name: string;
  description?: string;
  image: string;
  external_url?: string;
  total_supply: string;
  auction: string;
};

export type TokenInfo = {
  name: string;
  image: string;
};

export type Founder = {
  wallet: `0x${string}`;
  ownershipPct: number;
  vestExpiry: number;
};

export const getContractInfo = async ({ address }: { address: string }) => {
  const tokenContract = token({
    address: address as string,
  });

  const [contractURI, total_supply, auction] = await Promise.all([
    tokenContract.contractURI(),
    tokenContract.totalSupply(),
    tokenContract.auction(),
  ]);

  const contractJSON = parseBase64String(contractURI);

  return {
    ...contractJSON,
    image: getNormalizedURI(contractJSON.image, {
      preferredIPFSGateway: process.env.NEXT_PUBLIC_IPFS_GATEWAY,
    }),
    total_supply: total_supply.toHexString(),
    auction,
  } as ContractInfo;
};

export const getTokenInfo = async ({
  address,
  tokenid,
}: {
  address: string;
  tokenid: string;
}) => {
  const tokenContract = token({
    address: address as string,
  });

  const tokenURI = await tokenContract.tokenURI(BigNumber.from(tokenid));
  return parseBase64String(tokenURI) as TokenInfo;
};

export const getFounder = async ({
  address,
  founderId,
}: {
  address: string;
  founderId: string;
}) => {
  const tokenContract = token({
    address: address as string,
  });

  const { wallet, ownershipPct, vestExpiry } = await tokenContract.getFounder(
    BigNumber.from(founderId)
  );
  return { wallet, ownershipPct, vestExpiry } as Founder;
};
