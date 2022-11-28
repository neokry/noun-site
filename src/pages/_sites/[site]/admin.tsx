import useContractInfo from "@/hooks/fetch/useContractInfo";
import useFounder from "@/hooks/fetch/useFounder";
import { useIsMounted } from "@/hooks/useIsMounted";
import { compareAddress } from "@/utils/compareAddress";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import MetadataContext from "context/MetadataContext";
import useDebounce from "hooks/useDebounce";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";
import { useAccount } from "wagmi";

export default function Admin() {
  const isMounted = useIsMounted();
  const { data: founder } = useFounder();
  const { address } = useAccount();

  if (!isMounted || !founder?.wallet) return <Fragment />;

  const content = () => {
    if (!address) {
      return (
        <div className="w-full h-[60vh] text-xl font-semibold text-gray-500 flex items-center justify-around">
          <div>Connect your wallet to continue</div>
        </div>
      );
    }

    if (!compareAddress(founder?.wallet, address)) {
      return (
        <div className="w-full h-[60vh] text-xl font-semibold text-gray-500 flex items-center justify-around">
          <div>Unauthorized</div>
        </div>
      );
    }

    return (
      <div className="mx-24">
        <div className="mt-6 text-gray-500">Description</div>
        <div className="bg-gray-100 p-6 w-full mt-2 flex items-center justify-around">
          <DescriptionEditor />
        </div>
      </div>
    );
  };

  return (
    <MetadataContext.Provider>
      <Header />
      {content()}
    </MetadataContext.Provider>
  );
}

const Header = () => {
  const { data: contract } = useContractInfo();
  const { address } = useAccount();
  const { save, loading } = MetadataContext.useContainer();

  return (
    <div className="flex justify-between items-center border-b pb-4 py-20 px-24">
      <div>
        <div>{contract?.name || "..."}</div>
        <div className="text-5xl font-semibold mt-1">Settings</div>
      </div>
      <div className="flex items-center h-full">
        <div className={address ? "mr-6" : ""}>
          <ConnectButton showBalance={false} chainStatus={"none"} />
        </div>
        {address && (
          <button
            onClick={() => save()}
            className="h-9 w-20 bg-black text-white rounded-md flex items-center justify-around"
          >
            {loading ? (
              <Image src="/spinner.svg" alt="spinner" height={20} width={20} />
            ) : (
              <span>Save</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

const DescriptionEditor = () => {
  const { merge, data } = MetadataContext.useContainer();
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [valueHTML, setValueHTML] = useState("");
  const debouncedValue = useDebounce(data?.description || "", 500);

  useEffect(() => {
    const handler = async () => {
      const processedContent = await remark().use(html).process(debouncedValue);
      setValueHTML(processedContent.toString());
    };

    handler();
  }, [debouncedValue]);

  return (
    <div className="w-full">
      <div className="flex">
        <button
          onClick={() => setMode("edit")}
          className={`${
            mode == "edit" ? "bg-white" : "bg-gray-100"
          } rounded-md-t text-black p-2 w-20 mr-4`}
        >
          Edit
        </button>
        <button
          onClick={() => setMode("preview")}
          className={`${
            mode == "preview" ? "bg-white" : "bg-gray-100"
          } rounded-md-t text-black p-2 w-20`}
        >
          Preview
        </button>
      </div>

      {mode === "edit" && (
        <textarea
          value={data?.description || ""}
          onChange={(e) => merge({ description: e.target.value })}
          className="h-full w-full focus:outline-none p-6"
          rows={20}
        />
      )}

      {mode === "preview" && (
        <div
          className="h-full w-full focus:outline-none p-6 prose max-w-none bg-white"
          dangerouslySetInnerHTML={{ __html: valueHTML }}
        />
      )}
    </div>
  );
};
