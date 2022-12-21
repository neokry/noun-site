import { BuilderSDK } from "@buildersdk/sdk";
import DefaultProvider from "@/utils/DefaultProvider";
import parseBase64String from "@/utils/parseBase64String";
import getNormalizedURI from "@/utils/getNormalizedURI";
import { BigNumber, constants } from "ethers";
import { IPFS_GATEWAY } from "constants/urls";

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
  owner: `0x${string}`;
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
      preferredIPFSGateway: IPFS_GATEWAY,
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
  const tokenIdBn = BigNumber.from(tokenid);
  const [tokenURI, owner] = await Promise.allSettled([
    tokenContract.tokenURI(tokenIdBn),
    tokenContract.ownerOf(tokenIdBn),
  ]);

  if (tokenURI.status === "rejected") throw new Error("Error token not found");

  return {
    ...parseBase64String(tokenURI.value),
    owner: owner.status === "rejected" ? constants.AddressZero : owner?.value,
  } as TokenInfo;
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

export const getBalanceOf = async ({
  address,
  user,
}: {
  address: `0x${string}`;
  user: `0x${string}`;
}) => {
  const tokenContract = token({
    address,
  });

  return await tokenContract.balanceOf(user);
};
