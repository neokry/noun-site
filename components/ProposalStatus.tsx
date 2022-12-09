import { Proposal } from "@/services/nouns-builder/governor";
import { Fragment } from "react";

export default function ProposalStatus({ proposal }: { proposal: Proposal }) {
  const { state } = proposal;

  switch (state) {
    case 0:
      return (
        <div className="bg-green-600 text-white p-1 px-2 rounded-md">
          Pending
        </div>
      );
    case 1:
      return (
        <div className="bg-green-600 text-white p-1 px-2 rounded-md">
          Active
        </div>
      );
    case 2:
      return (
        <div className="bg-gray-400 text-white p-1 px-2 rounded-md">
          Canceled
        </div>
      );
    case 3:
      return (
        <div className="bg-red-600 text-white p-1 px-2 rounded-md">
          Defeated
        </div>
      );
    case 4:
      return (
        <div className="bg-green-600 text-white p-1 px-2 rounded-md">
          Succeeded
        </div>
      );
    case 5:
      return (
        <div className="bg-gray-400 text-white p-1 px-2 rounded-md">Queued</div>
      );
    case 6:
      return (
        <div className="bg-gray-400 text-white p-1 px-2 rounded-md">
          Expired
        </div>
      );
    case 7:
      return (
        <div className="bg-blue-600 text-white p-1 px-2 rounded-md">
          Executed
        </div>
      );
    case 8:
      return (
        <div className="bg-red-600 text-white p-1 px-2 rounded-md">Vetoed</div>
      );
    default:
      return <Fragment />;
  }
}
