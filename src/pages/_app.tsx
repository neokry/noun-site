import "../styles/globals.css";
import type { AppProps } from "next/app";
import { trpc } from "../utils/trpc";
import { WagmiConfig } from "wagmi";
import { wagmiClient, chains } from "../config/wallet";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          accentColor: "#222",
        })}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
export default trpc.withTRPC(MyApp);
