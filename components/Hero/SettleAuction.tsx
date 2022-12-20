import Image from "next/image";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { AuctionABI } from "@buildersdk/sdk";

export const SettleAuction = ({ auction }: { auction?: string }) => {
  const { config } = usePrepareContractWrite({
    address: auction,
    abi: AuctionABI,
    functionName: "settleCurrentAndCreateNewAuction",
    enabled: !!auction,
  });
  const { write, data, isLoading: contractLoading } = useContractWrite(config);
  const { isLoading: transactionLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  const isLoading = contractLoading || transactionLoading;

  return (
    <button
      onClick={() => write?.()}
      className="w-full bg-skin-button-accent hover:bg-skin-button-accent-hover h-12 text-white mt-6 rounded-lg flex items-center justify-around"
    >
      {isLoading ? (
        <Image src="/spinner.svg" height={26} width={26} alt="spinner" />
      ) : (
        <span>Settle Auction</span>
      )}
    </button>
  );
};
