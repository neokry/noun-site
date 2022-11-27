import { BuilderSDK } from "@buildersdk/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import DefaultProvider from "@/utils/DefaultProvider";
import parseBase64String from "@/utils/parseBase64String";
import getNormalizedURI from "@/utils/getNormalizedURI";

const { token } = BuilderSDK.connect({ signerOrProvider: DefaultProvider });

export type ContractInfo = {
  name: string;
  description?: string;
  image: string;
  external_url?: string;
  total_supply: string;
  auction: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, tokenid } = req.query;
  const tokenContract = token({
    address: address as string,
  });

  const [contractURI, total_supply, auction] = await Promise.all([
    tokenContract.contractURI(),
    tokenContract.totalSupply(),
    tokenContract.auction(),
  ]);

  const contractJSON = parseBase64String(contractURI);

  const contractInfo = {
    ...contractJSON,
    image: getNormalizedURI(contractJSON.image, {
      preferredIPFSGateway: process.env.NEXT_PUBLIC_IPFS_GATEWAY,
    }),
    total_supply: total_supply.toHexString(),
    auction,
  } as ContractInfo;

  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate=59");
  res.send(contractInfo);
};

export default handler;
