import { trpc } from "@/utils/trpc";
import Image from "next/image";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  const {
    query: { site },
  } = useRouter();

  const { data: contractInfo } = trpc.token.contract.useQuery({
    collectionAddress: site as string,
  });

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
