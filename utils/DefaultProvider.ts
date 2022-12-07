import { providers } from "ethers";

const provider = new providers.AlchemyProvider(
  "mainnet",
  process.env.NEXT_PUBLIC_ALCHEMY_KEY
);

export default provider;
