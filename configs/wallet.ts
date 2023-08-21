import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { mainnet, goerli, configureChains, createClient } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import { zoraTestnet, zora } from "@wagmi/chains";

const selectedChain = {
  "1": mainnet,
  "5": goerli,
  "999": zoraTestnet,
  "7777777": zora,
}[process.env.NEXT_PUBLIC_TOKEN_NETWORK ?? "1"]!;

export const RPC_URL = {
  "1": `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
  "5": `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
  "999": "https://testnet.rpc.zora.energy",
  "7777777": "https://rpc.zora.energy",
}[process.env.NEXT_PUBLIC_TOKEN_NETWORK ?? "1"]!;

export type ChainId = "1" | "5" | "999" | "7777777";

const { chains, provider } = configureChains(
  [selectedChain],
  [
    jsonRpcProvider({
      rpc: (_) => {
        return { http: RPC_URL };
      },
      stallTimeout: 1000,
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
  projectId: "12fcc83f53d043bf4282e8233ef1aad7",
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export { wagmiClient, chains };
