import { useTheme } from "@/hooks/useTheme";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export type CustomConnectButtonProps = {
  className: string;
};

const CustomConnectButton = ({ className }: CustomConnectButtonProps) => {
  const [theme] = useTheme();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <button
                    className={className}
                    onClick={openConnectModal}
                    type="button"
                  >
                    {theme.strings.connectWallet || "Connect Wallet"}
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    className={className}
                    onClick={openChainModal}
                    type="button"
                  >
                    {theme.strings.wrongNetwork || "Wrong network"}
                  </button>
                );
              }
              return (
                <button
                  className={className}
                  onClick={openAccountModal}
                  type="button"
                >
                  {account.displayName}
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;
