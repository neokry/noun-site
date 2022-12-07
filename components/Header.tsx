import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import useContractInfo from "hooks/fetch/useContractInfo";
import { useTheme } from "@/hooks/useTheme";
import NavigationItemsComponent from "./NavigationItem";
import Link from "next/link";
import useTreasuryBalance from "@/hooks/fetch/useTreasuryBalance";
import { utils } from "ethers";
import { ETHERSCAN_BASEURL } from "constants/urls";

export default function Header() {
  const { data: contractInfo } = useContractInfo();
  const { data: treasury } = useTreasuryBalance({
    auctionContract: contractInfo?.auction,
  });
  const [theme] = useTheme();

  const getBalance = () => {
    const balance = parseFloat(utils.formatEther(treasury?.balance || 0));
    if (balance > 1000) return balance.toFixed(2);
    if (balance > 100) return balance.toFixed(3);
    return balance.toFixed(4);
  };

  return (
    <div className="flex items-center justify-between px-6 sm:px-44 py-8">
      <div className="flex items-center">
        <Link href={"/"} className="flex items-center">
          {contractInfo?.image && (
            <Image
              src={theme.brand.logo || contractInfo?.image}
              height={90}
              width={90}
              alt="logo"
              className="rounded-full"
            />
          )}
          <div className="ml-4 text-skin-base font-bold text-xl">
            {contractInfo?.name}
          </div>
        </Link>

        <Link
          rel="noreferer noopener noreferrer"
          target="_blank"
          href={`${ETHERSCAN_BASEURL}/tokenholdings?a=${treasury?.address}`}
          className="ml-4 border hover:bg-skin-backdrop transition ease-in-out hover:scale-110 font-semibold rounded-xl px-6 h-10 flex items-center justify-around text-skin-muted border-skin-stroke"
        >
          Ξ {getBalance()}
        </Link>
      </div>

      <div className="flex items-center">
        {theme.nav.primary.map((item, i) => (
          <NavigationItemsComponent
            key={i}
            item={item}
            className="mr-4 border hover:bg-skin-backdrop transition ease-in-out hover:scale-110 font-semibold rounded-xl px-6 h-10 flex items-center justify-around text-skin-muted border-skin-stroke"
          />
        ))}
        <ConnectButton chainStatus={"none"} showBalance={false} />
      </div>
    </div>
  );
}
