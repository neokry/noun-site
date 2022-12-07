import { BigNumber, ethers, utils } from "ethers";
import Image from "next/image";
import { CountdownDisplay } from "../CountdownDisplay";
import useAuctionInfo from "@/hooks/fetch/useCurrentAuctionInfo";
import useContractInfo from "hooks/fetch/useContractInfo";
import useTokenInfo from "hooks/fetch/useTokenInfo";
import { compareAddress } from "@/utils/compareAddress";
import { SettleAuction } from "./SettleAuction";
import { PlaceBid } from "./PlaceBid";
import { HighestBidder } from "./HighestBidder";
import { useState } from "react";

export default function Hero() {
  const { data: contractInfo } = useContractInfo();
  const { data: auctionInfo } = useAuctionInfo({
    auctionContract: contractInfo?.auction,
  });

  const tokenId = contractInfo
    ? BigNumber.from(contractInfo.total_supply).sub(1).toHexString()
    : "";

  const { data: tokenInfo } = useTokenInfo({ tokenId });
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row items-center mt-0 sm:mt-10">
      <div className="sm:pr-12 sm:w-1/2 flex justify-end">
        {tokenInfo && (
          <Image
            src={tokenInfo.image}
            onLoad={() => setImageLoaded(true)}
            height={450}
            width={450}
            alt="logo"
            className={`sm:rounded-md ${imageLoaded ? "shadow-lg" : ""}`}
          />
        )}
      </div>
      <div className="w-auto mt-8 px-4">
        {tokenInfo && (
          <div className="text-4xl sm:text-6xl font-heading text-skin-base">
            {tokenInfo.name}
          </div>
        )}

        <div className="grid grid-cols-2 gap-12 mt-10 sm:w-96">
          <div className="border-r border-skin-stroke">
            <div className="text-lg text-skin-muted">Current Bid</div>
            {auctionInfo && (
              <div className="text-2xl font-semibold sm:text-3xl text-skin-base mt-2">
                Ξ {utils.formatEther(auctionInfo.highestBid || "0")}
              </div>
            )}
          </div>
          <div className="sm:w-64">
            <div className="text-lg text-skin-muted">Auction ends in</div>
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
      </div>
    </div>
  );
}
