import { BuilderSDK } from "@buildersdk/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import DefaultProvider from "@/utils/DefaultProvider";
import { BigNumber } from "ethers";
import parseBase64String from "@/utils/parseBase64String";
import NextCors from "nextjs-cors";

const { token } = BuilderSDK.connect({ signerOrProvider: DefaultProvider });

export type TokenInfo = {
  name: string;
  image: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const { address, tokenid } = req.query;
  const tokenContract = token({
    address: address as string,
  });

  const tokenURI = await tokenContract.tokenURI(BigNumber.from(tokenid));
  const tokenInfo = parseBase64String(tokenURI) as TokenInfo;

  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate=59");
  res.send(tokenInfo);
};

export default handler;
