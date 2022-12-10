import { BigNumber, ethers, utils } from "ethers";
import Image from "next/image";
import { CountdownDisplay } from "../CountdownDisplay";
import { useCurrentAuctionInfo, useContractInfo, useTokenInfo } from "hooks";
import { compareAddress } from "@/utils/compareAddress";
import { SettleAuction } from "./SettleAuction";
import { PlaceBid } from "./PlaceBid";
import { HighestBidder } from "./HighestBidder";
import { Fragment, useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { AuctionInfo } from "@/services/nouns-builder/auction";
import { ContractInfo } from "@/services/nouns-builder/token";
import { usePreviousAuctions } from "@/hooks/fetch/usePreviousAuctions";
import { useEnsName } from "wagmi";
import { shortenAddress } from "@/utils/shortenAddress";
import UserAvatar from "../UserAvatar";

export default function Hero() {
  const { data: contractInfo } = useContractInfo();
  const { data: auctionInfo } = useCurrentAuctionInfo({
    auctionContract: contractInfo?.auction,
  });
  const [theme] = useTheme();
  const [tokenId, setTokenId] = useState<string | undefined>();

  const currentTokenId = contractInfo
    ? BigNumber.from(contractInfo.total_supply).sub(1).toHexString()
    : "";

  const { data: tokenInfo } = useTokenInfo({ tokenId });
  const [imageLoaded, setImageLoaded] = useState(false);

  const pageBack = () => {
    const bnTokenId = BigNumber.from(tokenId);
    if (bnTokenId.eq(0)) return;
    setImageLoaded(false);
    setTokenId(bnTokenId.sub(1).toHexString());
  };

  const pageForward = () => {
    const bnTokenId = BigNumber.from(tokenId);
    if (bnTokenId.eq(currentTokenId)) return;
    setTokenId(bnTokenId.add(1).toHexString());
  };

  useEffect(() => {
    if (!tokenId) setTokenId(currentTokenId);
  }, [tokenId, currentTokenId]);

  console.log("tokenId", tokenId);

  return (
    <div className="flex flex-col sm:flex-row items-center sm:h-[80vh] pt-10">
      <div className="sm:w-1/2 mx-4 flex flex-col min-h-[400px] sm:min-h-auto justify-baseline items-end sm:pr-12 h-full relative">
        {tokenInfo && (
          <Image
            src={tokenInfo.image}
            onLoad={() => setImageLoaded(true)}
            height={450}
            width={450}
            alt="logo"
            className={`rounded-md relative z-20 ${
              imageLoaded ? "shadow-lg visible" : "invisible"
            }`}
          />
        )}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] hidden sm:flex items-center justify-around sm:pr-12">
          <Image src={"/spinner.svg"} alt="spinner" width={30} height={30} />
        </div>
      </div>
      <div className="px-4 w-screen sm:w-auto min-h-64 sm:h-full flex flex-col justify-stretch items-stretch mt-6 sm:mt-0">
        <div className="flex items-center mb-4">
          <button
            onClick={pageBack}
            className={`flex items-center ${
              tokenId === "0x00"
                ? "border border-skin-stroke"
                : "bg-skin-backdrop"
            } rounded-full p-2 mr-4`}
          >
            <ArrowLeftIcon
              className={`h-4 ${
                tokenId === "0x00" ? "text-skin-muted" : "text-skin-base"
              }`}
            />
          </button>
          <button
            onClick={pageForward}
            className={`flex items-center ${
              tokenId === currentTokenId
                ? "border border-skin-stroke"
                : "bg-skin-backdrop"
            } rounded-full p-2 mr-4`}
          >
            <ArrowRightIcon
              className={`h-4 ${
                tokenId === currentTokenId
                  ? "text-skin-muted"
                  : "text-skin-base"
              }`}
            />
          </button>
        </div>

        <div className="text-4xl sm:text-6xl font-heading text-skin-base">
          {tokenInfo?.name || "---"}
        </div>

        {tokenId === currentTokenId ? (
          <CurrentAuction
            auctionInfo={auctionInfo}
            contractInfo={contractInfo}
            tokenId={currentTokenId}
          />
        ) : (
          <EndedAuction
            auctionContract={contractInfo?.auction}
            tokenId={tokenId}
            owner={tokenInfo?.owner}
          />
        )}
      </div>
    </div>
  );
}

const EndedAuction = ({
  auctionContract,
  tokenId,
  owner,
}: {
  auctionContract?: string;
  tokenId?: string;
  owner?: `0x${string}`;
}) => {
  const { data } = usePreviousAuctions({ auctionContract });
  const auctionData = data?.find((auction) =>
    compareAddress(auction.tokenId, tokenId || "")
  );

  const { data: ensName } = useEnsName({
    address: owner,
  });

  return (
    <div className="grid grid-cols-2 gap-0 sm:gap-12 mt-10 sm:w-96 pb-8 sm:pb-0">
      <div className="border-r mr-8 sm:mr-0 border-skin-stroke">
        <div className="text-lg text-skin-muted">{"Winning Bid"}</div>
        {auctionData ? (
          <div className="text-2xl font-semibold sm:text-3xl text-skin-base mt-2">
            Ξ {utils.formatEther(auctionData.amount || "0")}
          </div>
        ) : (
          <div className="text-2xl font-semibold sm:text-3xl text-skin-base mt-2">
            n/a
          </div>
        )}
      </div>
      <div className="sm:w-64">
        <div className="text-lg text-skin-muted">{"Held by"}</div>

        <div className="flex items-center mt-2">
          <UserAvatar
            diameter={32}
            className="w-8 h-8 rounded-full mr-2"
            address={owner || ethers.constants.AddressZero}
          />
          <div className="text-xl font-semibold sm:text-3xl text-skin-base">
            {ensName || shortenAddress(owner || ethers.constants.AddressZero)}
          </div>
        </div>
      </div>
    </div>
  );
};

const CurrentAuction = ({
  auctionInfo,
  contractInfo,
  tokenId,
}: {
  auctionInfo?: AuctionInfo;
  contractInfo?: ContractInfo;
  tokenId: string;
}) => {
  const [theme] = useTheme();

  return (
    <Fragment>
      <div className="grid grid-cols-2 gap-12 mt-10 sm:w-96">
        <div className="border-r border-skin-stroke">
          <div className="text-lg text-skin-muted">
            {theme.strings.currentBid || "Current Bid"}
          </div>
          {auctionInfo && (
            <div className="text-2xl font-semibold sm:text-3xl text-skin-base mt-2">
              Ξ {utils.formatEther(auctionInfo.highestBid || "0")}
            </div>
          )}
        </div>
        <div className="sm:w-64">
          <div className="text-lg text-skin-muted">
            {theme.strings.auctionEndsIn || "Auction ends in"}
          </div>
          {auctionInfo && (
            <div className="text-2xl font-semibold sm:text-3xl text-skin-base mt-2">
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
    </Fragment>
  );
};
