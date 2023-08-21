import { ReactElement } from "react";
import { useAccount, useNetwork } from "wagmi";
import CustomConnectButton from "./CustomConnectButton";

export default function AuthWrapper({
  children,
  className,
}: {
  children: ReactElement;
  className: string;
}) {
  const { address } = useAccount();
  const { chain } = useNetwork();

  if (address && !chain?.unsupported) return children;
  return <CustomConnectButton className={className} />;
}
