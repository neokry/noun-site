import { useTheme } from "@/hooks/useTheme";
import { Transition } from "@headlessui/react";
import CustomConnectButton from "./CustomConnectButton";
import NavigationItemComponent from "./NavigationItem";

export default function MobileMenu({ show }: { show: boolean }) {
  const [theme] = useTheme();

  return (
    <Transition
      show={show}
      enter="transition-[height] duration-300"
      enterFrom="h-0 w-full"
      enterTo="h-52 w-full"
      leave="transition-[height] duration-300"
      leaveFrom="h-52 w-full"
      leaveTo="h-0 w-full"
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
