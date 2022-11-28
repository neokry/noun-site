import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;

  const result = await prisma.site.findFirst({
    where: { contract: address as string },
  });

  return res.send(result);
};

const upsert = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;
  const { description } = req.body;

  const result = await prisma.site.upsert({
    where: { contract: address as string },
    update: { description },
    create: { description, contract: address as string },
  });

  res.revalidate(`/_sites/${address}`);
  return res.send(result);
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return get(req, res);
    case "POST":
      return upsert(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
