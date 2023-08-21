import { RPC_URL } from "configs/wallet";
import { providers } from "ethers";

const provider = new providers.JsonRpcProvider(RPC_URL);

export default provider;
