export default function getNormalizedURI(
  uri: string,
  { preferredIPFSGateway }: { preferredIPFSGateway?: string }
) {
  if (uri.startsWith("ipfs://")) {
    return uri.replace(
      "ipfs://",
      preferredIPFSGateway || "https://ipfs.io/ipfs/"
    );
  }
  if (uri.includes("/ipfs/") && preferredIPFSGateway) {
    return `${preferredIPFSGateway}${uri.replace(/^.+\/ipfs\//, "")}`;
  }
  if (uri.startsWith("ar://")) {
    return uri.replace("ar://", "https://arweave.net/");
  }

  return uri;
}
