import Image from "next/image";
import {
  useContractInfo,
  useDAOAddresses,
  useTreasuryBalance,
  useTheme,
} from "hooks";
import NavigationItemsComponent from "./NavigationItem";
import Link from "next/link";
import { ETHERSCAN_BASEURL } from "constants/urls";
import CustomConnectButton from "./CustomConnectButton";
import { Bars3Icon } from "@heroicons/react/20/solid";
import MobileMenu from "./MobileMenu";
import { Fragment, useState } from "react";
import { TOKEN_CONTRACT } from "constants/addresses";
import { formatTreasuryBalance } from "@/utils/formatTreasuryBalance";

export default function Header() {
  const { data: contractInfo } = useContractInfo();
  const { data: addresses } = useDAOAddresses({
    tokenContract: TOKEN_CONTRACT,
  });
  const { data: treasury } = useTreasuryBalance({
    treasuryContract: addresses?.treasury,
  });
  const [theme] = useTheme();
  const [showMobile, setShowMobile] = useState(false);

  const onlyTitle = theme.brand.title !== null && theme.brand.logo === null;

  return (
    <Fragment>
      <div className="flex items-center justify-between w-full px-6 py-8 xl:w-[1200px]">
        <div className="flex items-center z-20">
          <Link href={"/"} className="flex items-center mr-2 sm:mr-4">
            {theme.brand.logo !== null && contractInfo?.image && (
              <Image
                src={theme.brand.logo || contractInfo?.image}
                height={90}
                width={90}
                style={{ height: theme.styles.logoHeight }}
                alt="logo"
                className="rounded-full object-scale-down w-auto"
              />
            )}
            {theme.brand.title !== null && contractInfo?.name && (
              <div
                className={`ml-4 text-skin-base font-bold text-xl ${
                  !onlyTitle && "hidden sm:block"
                } `}
              >
                {theme.brand.title || contractInfo?.name}
              </div>
            )}
          </Link>

          <Link
            rel="noreferer noopener noreferrer"
            target="_blank"
            href={`${ETHERSCAN_BASEURL}/tokenholdings?a=${addresses?.treasury}`}
            className="ml-4 border hover:bg-skin-backdrop transition ease-in-out hover:scale-110 font-semibold rounded-xl px-6 h-10 flex items-center justify-around text-skin-muted border-skin-stroke"
          >
            Ξ {treasury ? formatTreasuryBalance(treasury) : "0"}
          </Link>
        </div>

        <div className="items-center hidden sm:flex">
          {theme.nav.primary.map((item, i) => (
            <NavigationItemsComponent
              key={i}
              item={item}
              className="mr-4 border hover:bg-skin-backdrop transition ease-in-out hover:scale-110 font-semibold rounded-xl px-6 h-10 flex items-center justify-around text-skin-muted border-skin-stroke"
            />
          ))}
          <CustomConnectButton className="bg-skin-backdrop px-6 h-10 rounded-xl border border-skin-stroke text-skin-base transition ease-in-out hover:scale-110" />
        </div>

        <button onClick={() => setShowMobile((x) => !x)} className="sm:hidden">
          <Bars3Icon className="h-10 py-1 px-3 text-skin-muted rounded-xl border border-skin-stroke focus:outline-none" />
        </button>
      </div>
      <MobileMenu show={showMobile} />
    </Fragment>
  );
}
