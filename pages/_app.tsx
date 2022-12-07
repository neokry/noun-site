import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { wagmiClient, chains } from "../configs/wallet";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { SWRConfig } from "swr";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
import { useInitTheme } from "@/hooks/useInitTheme";

const fullConfig = resolveConfig(tailwindConfig);
const bg = (fullConfig.theme?.backgroundColor as any).skin;
const text = (fullConfig.theme?.textColor as any).skin;

const MyApp = ({ Component, pageProps }: AppProps) => {
  useInitTheme();

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
            accentColor: bg["muted"](100),
            accentColorForeground: text["base"](100),
          })}
        >
          <div className="font-body">
            <Component {...pageProps} />
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </SWRConfig>
  );
};
export default MyApp;
