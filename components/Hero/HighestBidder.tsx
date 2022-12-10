import { Fragment } from "react";
import { useEnsName } from "wagmi";
import { useTheme } from "@/hooks/useTheme";
import { shortenAddress } from "@/utils/shortenAddress";
import UserAvatar from "../UserAvatar";

export const HighestBidder = ({ address }: { address?: `0x${string}` }) => {
  const { data: ensName } = useEnsName({ address });
  const [theme] = useTheme();

  if (!address) return <Fragment />;

  return (
    <div className="flex items-center justify-between w-full mt-6 sm:border-b border-skin-stroke pb-4">
      <div className="text-skin-muted">
        {theme.strings.highestBidder || "Highest Bidder"}
      </div>

      <div className="flex items-center">
        <div className="flex items-center mt-2">
          <UserAvatar className="h-6 rounded-full mr-2" address={address} />
          <div className="font-semibold text-skin-base">
            {ensName || shortenAddress(address)}
          </div>
        </div>
      </div>
    </div>
  );
};
