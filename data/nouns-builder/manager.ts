import { BuilderSDK } from "@buildersdk/sdk";
import DefaultProvider from "@/utils/DefaultProvider";
import { MANAGER_CONTRACT } from "constants/addresses";

const { manager } = BuilderSDK.connect({ signerOrProvider: DefaultProvider });

export type DAOAddresses = {
  metadata: `0x${string}`;
  auction: `0x${string}`;
  treasury: `0x${string}`;
  governor: `0x${string}`;
};

export const getAddresses = async ({
  tokenAddress,
}: {
  tokenAddress: `0x${string}`;
}): Promise<DAOAddresses> => {
  const { metadata, auction, treasury, governor } = await manager({
    address: MANAGER_CONTRACT,
  }).getAddresses(tokenAddress);

  return { metadata, auction, treasury, governor };
};
