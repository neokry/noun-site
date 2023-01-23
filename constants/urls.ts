const ETHERSCAN_BASEURL_BY_NETWORK = {
  1: "https://etherscan.io",
  5: "https://goerli.etherscan.io",
};

export const ETHERSCAN_BASEURL =
  ETHERSCAN_BASEURL_BY_NETWORK[
    parseInt(process.env.NEXT_PUBLIC_TOKEN_NETWORK ?? "1") as 1 | 5
  ];

export const ETHER_ACTOR_BASEURL = "https://ether.actor";
export const IPFS_GATEWAY =
  process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://gateway.pinata.cloud/ipfs/";
