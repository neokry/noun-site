import { useTokenBalance } from "@/hooks/fetch/useTokenBalance";
import { Proposal } from "@/services/nouns-builder/governor";
import { TOKEN_CONTRACT } from "constants/addresses";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useDAOAddresses } from "../hooks";
import { GovernorABI } from "@buildersdk/sdk";
import { BigNumber } from "ethers";
import { useState } from "react";
import Image from "next/image";

export default function VoteModal({
  proposal,
  proposalNumber,
}: {
  proposal: Proposal;
  proposalNumber: number;
}) {
  const { data: balance } = useTokenBalance({ tokenContract: TOKEN_CONTRACT });
  const { data: addresses } = useDAOAddresses({
    tokenContract: TOKEN_CONTRACT,
  });
  const [support, setSupport] = useState<0 | 1 | 2 | undefined>();
  const { config } = usePrepareContractWrite(
    support
      ? {
          address: addresses?.governor,
          abi: GovernorABI,
          functionName: "castVote",
          args: [proposal.proposalId, BigNumber.from(support)],
        }
      : undefined
  );
  const { write, data, isLoading: writeLoading } = useContractWrite(config);
  const {
    data: tx,
    isLoading: txLoading,
    isSuccess: txSuccess,
  } = useWaitForTransaction(data?.hash);

  return (
    <div className="text-center text-skin-base pb-4">
      <div className="font-heading text-4xl font-bold">
        Vote on Prop {proposalNumber}
      </div>
      <div className="text-skin-muted text-lg mt-2">
        Voting with {balance} NFTs
      </div>

      <button
        onClick={() => setSupport(1)}
        className={`w-full ${
          support === 1
            ? "bg-green-200 text-green-600"
            : "bg-skin-backdrop hover:bg-skin-muted"
        } rounded-xl py-2 mt-6 border border-skin-stroke text-skin-muted`}
      >
        For
      </button>

      <button
        onClick={() => setSupport(0)}
        className={`w-full ${
          support === 0
            ? "bg-red-200 text-red-600"
            : "bg-skin-backdrop hover:bg-skin-muted"
        } rounded-xl py-2 mt-6 border border-skin-stroke text-skin-muted`}
      >
        Against
      </button>

      <button
        onClick={() => setSupport(2)}
        className={`w-full ${
          support === 2
            ? "bg-gray-300 text-gray-700"
            : "bg-skin-backdrop hover:bg-skin-muted"
        } rounded-xl py-2 mt-6 border border-skin-stroke text-skin-muted`}
      >
        Abstain
      </button>

      <button
        onClick={() => write?.()}
        className={`w-full ${
          write
            ? "bg-skin-button-accent hover:bg-skin-button-accent-hover text-skin-inverted"
            : "bg-skin-button-muted text-skin-inverted"
        } rounded-xl py-2 mt-6 flex justify-around`}
      >
        {txSuccess ? (
          "Vote Submitted 🎉"
        ) : writeLoading || txLoading ? (
          <Image src={"/spinner.svg"} alt="spinner" width={20} height={20} />
        ) : (
          "Submit Vote"
        )}
      </button>
    </div>
  );
}
