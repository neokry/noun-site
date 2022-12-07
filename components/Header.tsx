import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import useContractInfo from "hooks/fetch/useContractInfo";
import { useTheme } from "@/hooks/useTheme";
import NavigationItemsComponent from "./NavigationItem";

export default function Header() {
  const { data: contractInfo } = useContractInfo();
  const [theme] = useTheme();

  return (
    <div className="flex items-center justify-between px-6 sm:px-44 py-8">
      <div className="flex items-center">
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
