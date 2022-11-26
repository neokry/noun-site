import { ethers } from "ethers";

const provider = ethers.getDefaultProvider("mainnet", {
  alchemy: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
});

export default provider;
