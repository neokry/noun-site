import Image from "next/image";
import { Fragment } from "react";
import { useEnsName, useEnsAvatar } from "wagmi";
import getNormalizedURI from "@/utils/getNormalizedURI";

export const HighestBidder = ({ address }: { address?: `0x${string}` }) => {
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ address });

  const len = address?.length || 0;
  const shortAddress = `${address?.slice(0, 5)}...${address?.slice(
    len - 5,
    len
  )}`;

  if (!address) return <Fragment />;

  return (
    <div className="flex items-center justify-between w-full mt-6 border-b border-skin-stroke pb-4">
      <div className="text-skin-muted">Highest Bidder</div>

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
        <div className="font-semibold text-skin-base">
          {ensName || shortAddress}
        </div>
      </div>
    </div>
  );
};
