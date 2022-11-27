import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import useContractInfo from "hooks/fetch/useContractInfo";

export default function Header() {
  const { data: contractInfo } = useContractInfo();

  return (
    <div className="flex items-center justify-between px-24 py-4">
      <div className="flex items-center">
        {contractInfo?.image && (
          <Image
            src={contractInfo?.image}
            height={50}
            width={50}
            alt="logo"
            className="rounded-full"
          />
        )}
        <div className="ml-4">{contractInfo?.name}</div>
      </div>
      <div>
        <ConnectButton chainStatus={"none"} showBalance={false} />
      </div>
    </div>
  );
}
