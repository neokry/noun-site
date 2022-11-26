import { trpc } from "@/utils/trpc";
import { BigNumber, utils } from "ethers";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { CountdownDisplay } from "./CountdownDisplay";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useEnsName,
  useEnsAvatar,
} from "wagmi";
import { AuctionABI } from "@buildersdk/sdk";
import useDebounce from "@/hooks/useDebounce";
import getNormalizedURI from "@/utils/getNormalizedURI";

export default function Hero() {
  const {
    query: { site },
  } = useRouter();

  const { data: contractInfo } = trpc.token.contract.useQuery({
    collectionAddress: site as string,
  });

  const enabled = !!contractInfo;
  const { data: auctionInfo } = trpc.auction.currentAuction.useQuery(
    {
      auctionAddress: contractInfo?.auction || "",
    },
    { enabled }
  );

  const tokenId = contractInfo
    ? BigNumber.from(contractInfo.total_supply).sub(1).toHexString()
    : "";

  const { data: tokenInfo } = trpc.token.info.useQuery(
    {
      collectionAddress: site as string,
      tokenId,
    },
    { enabled }
  );

  return (
    <div className="flex items-center mt-16">
      <div className="pr-12 w-1/2 flex justify-end">
        {tokenInfo && (
          <Image src={tokenInfo.image} height={500} width={500} alt="logo" />
        )}
      </div>

      <div className="w-auto">
        {tokenInfo && (
          <div className="text-6xl font-bold">{tokenInfo.name}</div>
        )}

        <div className="grid grid-cols-2 gap-12 mt-10 w-96">
          <div className="border-r">
            <div className="text-xl text-gray-400">Current Bid</div>
            {auctionInfo && (
              <div className="text-3xl">
                Ξ {utils.formatEther(auctionInfo.highestBid)}
              </div>
            )}
          </div>
          <div className="w-64">
            <div className="text-xl text-gray-400">Auction ends in</div>
            {auctionInfo && (
              <div className="text-3xl">
                <CountdownDisplay to={auctionInfo.endTime} />
              </div>
            )}
          </div>
        </div>

        <PlaceBid
          highestBid={auctionInfo?.highestBid}
          auction={contractInfo?.auction}
          tokenId={tokenId}
        />

        <HighestBidder address={auctionInfo?.highestBidder} />
      </div>
    </div>
  );
}

const HighestBidder = ({ address }: { address?: `0x${string}` }) => {
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ address });

  const len = address?.length || 0;
  const shortAddress = `${address?.slice(0, 5)}...${address?.slice(
    len - 5,
    len
  )}`;

  if (!address) return <Fragment />;

  return (
    <div className="flex items-center justify-between w-full mt-6 border-b pb-4">
      <div className="text-gray-500">Highest Bidder</div>

      <div className="flex items-center">
        {ensAvatar && (
          <Image
            src={getNormalizedURI(ensAvatar, {
              preferredIPFSGateway: process.env.NEXT_PUBLIC_IPFS_GATEWAY,
            })}
            className="mr-2 rounded-full w-8 h-8"
            alt="avatar"
            height={20}
            width={20}
          />
        )}
        <div className="font-semibold">{ensName || shortAddress}</div>
      </div>
    </div>
  );
};

const PlaceBid = ({
  highestBid,
  auction,
  tokenId,
}: {
  highestBid?: string;
  auction?: string;
  tokenId?: string;
}) => {
  const [bid, setBid] = useState("");
  const debouncedBid = useDebounce(bid, 500);

  const { config, error } = usePrepareContractWrite({
    address: "0x73924Aa28f23256D994E20803a6C63d9dd056d7d",
    abi: AuctionABI,
    functionName: "createBid",
    args: [BigNumber.from(tokenId || 1)],
    overrides: {
      value: utils.parseEther(debouncedBid || "0"),
    },
    enabled: !!auction && !!debouncedBid,
  });
  const { write, data } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  console.log("error", error);

  return (
    <div className="mt-6 flex">
      <input
        value={bid}
        onChange={(e) => setBid(e.target.value)}
        className="bg-gray-100 px-3 py-3 rounded-lg w-full text-2xl mr-2 focus:outline-none"
        placeholder={
          highestBid ? `Ξ ${utils.formatEther(highestBid)} or more` : ""
        }
      />
      <button
        disabled={!write}
        onClick={(e) => {
          e.preventDefault();
          write?.();
        }}
        className={`${
          write ? "bg-black" : "bg-gray-700"
        } rounded-lg text-xl text-white w-40`}
      >
        {isLoading ? "Placing bid..." : "Place bid"}
      </button>
    </div>
  );
};
