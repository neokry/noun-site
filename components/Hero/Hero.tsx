import { BigNumber, ethers, utils } from "ethers";
import Image from "next/image";
import { CountdownDisplay } from "../CountdownDisplay";
import { useCurrentAuctionInfo, useContractInfo, useTokenInfo } from "hooks";
import { compareAddress } from "@/utils/compareAddress";
import { SettleAuction } from "./SettleAuction";
import { PlaceBid } from "./PlaceBid";
import { HighestBidder } from "./HighestBidder";
import { Fragment, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { AuctionInfo } from "@/services/nouns-builder/auction";
import { ContractInfo } from "@/services/nouns-builder/token";
import { usePreviousAuctions } from "@/hooks/fetch/usePreviousAuctions";
import { useEnsName } from "wagmi";
import { shortenAddress } from "@/utils/shortenAddress";
import UserAvatar from "../UserAvatar";
import { useRouter } from "next/router";

export default function Hero() {
  const { data: contractInfo } = useContractInfo();
  const { data: auctionInfo } = useCurrentAuctionInfo({
    auctionContract: contractInfo?.auction,
  });
  const { query, push } = useRouter();

  const currentTokenId = auctionInfo ? auctionInfo?.tokenId : "";

  const tokenId = query.tokenid
    ? BigNumber.from(query.tokenid as string).toHexString()
    : currentTokenId;

  const { data: tokenInfo } = useTokenInfo({ tokenId });
  const [imageLoaded, setImageLoaded] = useState(false);

  const pageBack = () => {
    const bnTokenId = BigNumber.from(tokenId);
    if (bnTokenId.eq(0)) return;
    setImageLoaded(false);
    push(`/token/${bnTokenId.sub(1).toNumber()}`, undefined, {
      shallow: true,
    });
  };

  const pageForward = () => {
    const bnTokenId = BigNumber.from(tokenId);
    if (bnTokenId.eq(currentTokenId)) return;
    push(`/token/${bnTokenId.add(1).toNumber()}`, undefined, {
      shallow: true,
    });
  };

  return (
    <div className="flex flex-col relative z-20 bg-skin-fill lg:flex-row items-top lg:h-[80vh] lg:max-h-[600px] lg:pt-10">
      <div className="lg:w-1/2 mx-4 flex flex-col min-h-[350px] min-h-auto lg:min-h-auto justify-baseline items-end lg:pr-12 relative">
        {tokenInfo && (
          <div className="w-full h-auto flex items-center justify-around">
            <Image
              src={tokenInfo.image}
              onLoad={() => setImageLoaded(true)}
              height={450}
              width={450}
              alt="logo"
              className={`rounded-md relative z-20 w-100 h-100 lg:h-[65vh] lg:max-h-[500px] ${
                imageLoaded ? "visible" : "invisible"
              }`}
            />
          </div>
        )}
        <div
          className={`absolute top-0 right-0 w-[450px] h-[450px] hidden lg:flex items-center justify-around lg:pr-12 ${
            imageLoaded ? "invisible" : "visible"
          }`}
        >
          <Image src={"/spinner.svg"} alt="spinner" width={30} height={30} />
        </div>
      </div>
      <div className="px-4 w-screen lg:w-auto min-h-64 lg:h-full flex flex-col justify-stretch items-stretch mt-6 lg:mt-0">
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

        <div className="text-4xl sm:text-6xl font-heading text-skin-base font-semibold">
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mt-10 lg:w-96 pb-8 lg:pb-0">
      <div className="lg:border-r mr-8 lg:mr-0 border-skin-stroke">
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
      <div className="lg:w-64">
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
      <div className="grid grid-cols-2 gap-12 mt-10 lg:w-96">
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
        <div className="lg:w-64">
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
