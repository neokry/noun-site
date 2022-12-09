import { providers } from "ethers";

const provider = new providers.AlchemyProvider(
  process.env.NEXT_PUBLIC_TOKEN_NETWORK === "5" ? "goerli" : "mainnet",
  process.env.NEXT_PUBLIC_ALCHEMY_KEY
);

export default provider;
