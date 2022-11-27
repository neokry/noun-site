import "../styles/globals.css";
import type { AppProps } from "next/app";
import { trpc } from "../utils/trpc";
import { WagmiConfig } from "wagmi";
import { wagmiClient, chains } from "../config/wallet";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { SWRConfig } from "swr";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
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
    </SWRConfig>
  );
};
export default trpc.withTRPC(MyApp);
