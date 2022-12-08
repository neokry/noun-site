import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function FaqElement({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title: string;
  className: string;
}) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className={`${className}`}>
            <div className={open ? "text-skin-highlighted" : ""}>{title}</div>
            <ChevronDownIcon
              className={`${
                open ? "rotate-180 transform" : ""
              } h-8 transition ease-in-out text-skin-base`}
            />
          </Disclosure.Button>

          <Transition
            enter="transition duration-200 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-100"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel>{children}</Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
