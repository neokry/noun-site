export const shortenAddress = (address: string, amount: number = 5) =>
  `${address?.slice(0, amount)}...${address?.slice(
    address.length - amount,
    address.length
  )}`;
