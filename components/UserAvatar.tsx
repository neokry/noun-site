import { useEnsAvatar } from "wagmi";
import Image from "next/image";
import getNormalizedURI from "@/utils/getNormalizedURI";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

export default function UserAvatar({
  address,
  className,
  diameter,
}: {
  address: `0x${string}`;
  className: string;
  diameter?: number;
}) {
  const { data: ensAvatar } = useEnsAvatar({
    address,
  });

  if (!ensAvatar)
    return (
      <div className={className}>
        <Jazzicon diameter={diameter} seed={jsNumberForAddress(address)} />
      </div>
    );

  if (ensAvatar.includes("ipfs"))
    return (
      <Image
        src={getNormalizedURI(ensAvatar, {
          preferredIPFSGateway: process.env.NEXT_PUBLIC_IPFS_GATEWAY,
        })}
        className={className}
        alt="avatar"
        height={20}
        width={20}
      />
    );

  return <img alt="avatar" src={ensAvatar} className={className} />;
}
