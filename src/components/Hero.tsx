import { BigNumber, ethers, utils } from "ethers";
import Image from "next/image";
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
import useAuctionInfo from "hooks/fetch/useAuctionInfo";
import useContractInfo from "hooks/fetch/useContractInfo";
import useTokenInfo from "hooks/fetch/useTokenInfo";
import { compareAddress } from "@/utils/compareAddress";

export default function Hero() {
  const { data: contractInfo } = useContractInfo();
  const { data: auctionInfo } = useAuctionInfo({
    address: contractInfo?.auction,
  });

  const tokenId = contractInfo
    ? BigNumber.from(contractInfo.total_supply).sub(1).toHexString()
    : "";

  const { data: tokenInfo } = useTokenInfo({ tokenId });

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
                Ξ {utils.formatEther(auctionInfo.highestBid || "0")}
              </div>
            )}
          </div>
          <div className="w-64">
            <div className="text-xl text-gray-400">Auction ends in</div>
            {auctionInfo && (
              <div className="text-3xl">
                <CountdownDisplay to={auctionInfo.endTime || "0"} />
              </div>
            )}
          </div>
        </div>

        {(auctionInfo?.endTime || 0) < Math.round(Date.now() / 1000) ? (
          <SettleAuction auction={contractInfo?.auction} />
        ) : (
          <PlaceBid
            highestBid={auctionInfo?.highestBid || "0"}
            auction={contractInfo?.auction}
            tokenId={tokenId}
          />
        )}

        {auctionInfo?.highestBidder &&
          !compareAddress(
            auctionInfo?.highestBidder,
            ethers.constants.AddressZero
          ) && <HighestBidder address={auctionInfo?.highestBidder} />}
      </div>
    </div>
  );
}

const SettleAuction = ({ auction }: { auction?: string }) => {
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

  console.log("auction", auction);
  const isLoading = contractLoading || transactionLoading;

  return (
    <button
      onClick={() => write?.()}
      className="w-full bg-black h-12 text-white mt-6 rounded-md flex items-center justify-around"
    >
      {isLoading ? (
        <Image src="/spinner.svg" height={26} width={26} alt="spinner" />
      ) : (
        <span>Settle Auction</span>
      )}
    </button>
  );
};

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
    address: auction,
    abi: AuctionABI,
    functionName: "createBid",
    args: [BigNumber.from(tokenId || 1)],
    overrides: {
      value: utils.parseEther(debouncedBid || "0"),
    },
    enabled: !!auction && !!debouncedBid,
  });
  const { write, data } = useContractWrite(config);
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  const highestBidBN = BigNumber.from(highestBid);
  const amountIncrease = highestBidBN.div("10");
  const nextBidAmount = highestBidBN.add(amountIncrease);

  const getError = () => {
    if (!error?.message) return;
    const message = error?.message;
    console.log("error", message);

    if (message.includes("insufficient funds"))
      return "Error insufficent funds for bid";

    if (debouncedBid && debouncedBid < utils.formatEther(nextBidAmount))
      return "Error invalid bid";
  };

  return (
    <Fragment>
      <div className="mt-6 flex">
        <input
          value={bid}
          type="number"
          onChange={(e) => setBid(e.target.value)}
          className="bg-gray-100 px-3 py-3 rounded-lg w-full text-2xl mr-2 focus:outline-none"
          placeholder={
            nextBidAmount ? `Ξ ${utils.formatEther(nextBidAmount)} or more` : ""
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
          } rounded-lg text-xl text-white w-40 flex items-center justify-around`}
        >
          {isLoading ? (
            <Image src="/spinner.svg" height={24} width={24} alt="spinner" />
          ) : (
            <span>Place bid</span>
          )}
        </button>
      </div>
      {error && (
        <p className="w-96 h-auto break-words text-center mt-5 text-red-500">
          {getError()}
        </p>
      )}
    </Fragment>
  );
};
