import { useTheme } from "@/hooks/useTheme";
import { Transition } from "@headlessui/react";
import mobileMenu from "globals/mobileMenu";
import { useAtom } from "jotai";
import CustomConnectButton from "./CustomConnectButton";
import NavigationItemComponent from "./NavigationItem";

export default function MobileMenu({ show }: { show: boolean }) {
  const [theme] = useTheme();

  return (
    <Transition
      show={show}
      enter="transition-[max-height] duration-500 ease-in"
      enterFrom="max-h-0"
      enterTo="max-h-64"
      leave="transition-[max-height] duration-500 ease-out"
      leaveFrom="max-h-64"
      leaveTo="max-h-0"
    >
      <div className="flex flex-col px-4 mb-4">
        {theme.nav.primary.map((item, i) => (
          <NavigationItemComponent
            key={i}
            item={item}
            className="mb-2 border border-skin-stroke transition ease-in-out hover:scale-110 font-semibold rounded-xl px-6 h-10 flex items-center justify-around text-skin-muted"
          />
        ))}
        <CustomConnectButton className="bg-skin-backdrop w-full px-6 h-10 rounded-xl border border-skin-stroke text-skin-base transition ease-in-out hover:scale-110" />
      </div>
    </Transition>
  );
}
