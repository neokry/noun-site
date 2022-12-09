import { useDAOAddresses, useGetAllProposals } from "hooks/fetch";
import { TOKEN_CONTRACT } from "constants/addresses";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { getProposalName } from "@/utils/getProposalName";
import ProposalStatus from "@/components/ProposalStatus";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useEnsName } from "wagmi";
import { shortenAddress } from "@/utils/shortenAddress";
import { getProposalDescription } from "@/utils/getProposalDescription";
import sanitizeHtml from "sanitize-html";
import ModalWrapper from "@/components/ModalWrapper";
import VoteModal from "@/components/VoteModal";
import { Fragment, useState } from "react";
import { useTokenBalance } from "@/hooks/fetch/useTokenBalance";

export default function Proposal() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: addresses } = useDAOAddresses({
    tokenContract: TOKEN_CONTRACT,
  });
  const { data: proposals } = useGetAllProposals({
    governorContract: addresses?.governor,
  });

  const {
    query: { proposalid },
  } = useRouter();

  const proposalNumber = proposals
    ? proposals.length - proposals.findIndex((x) => x.proposalId === proposalid)
    : 0;

  const proposal = proposals?.find((x) => x.proposalId === proposalid);
  const isActive = proposal?.state === 1;

  const { data: ensName } = useEnsName({
    address: proposal?.proposal.proposer,
  });

  if (!proposal)
    return (
      <Layout>
        <div className="flex items-center justify-around mt-8">
          <Image src={"/spinner.svg"} alt="spinner" width={30} height={30} />
        </div>
      </Layout>
    );

  const { forVotes, againstVotes, abstainVotes, voteEnd, voteStart } =
    proposal?.proposal || {};

  const getVotePercentage = (votes: number) => {
    if (!proposal || !votes) return 0;
    const total = forVotes + againstVotes + abstainVotes;

    const value = Math.round((votes / total) * 100);
    if (value > 100) return 100;
    return value;
  };

  const getDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    const month = date.toLocaleString("default", { month: "long" });
    return `${month} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const getTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();

    return `${hours}:${minutes} ${date.getHours() >= 12 ? "PM" : "AM"}`;
  };

  return (
    <Layout>
      <ModalWrapper open={modalOpen} setOpen={setModalOpen}>
        <VoteModal proposal={proposal} proposalNumber={proposalNumber} />
      </ModalWrapper>
      <div className="flex items-baseline">
        <Link
          href="/vote"
          className="flex items-center border border-skin-stroke hover:bg-skin-muted rounded-full p-2 mr-4"
        >
          <ArrowLeftIcon className="h-4" />
        </Link>

        <div>
          <div className="flex items-center">
            <div className="font-heading text-2xl text-skin-muted mr-4">
              Proposal {proposalNumber}
            </div>
            <ProposalStatus proposal={proposal} />
          </div>
          <div className="mt-2 text-5xl font-heading text-skin-base">
            {getProposalName(proposal.description)}
          </div>
          <div className="mt-4 text-2xl font-heading text-skin-muted">
            Proposed by{" "}
            <span className="text-skin-highlighted">
              {ensName || shortenAddress(proposal.proposal.proposer)}
            </span>
          </div>
        </div>
      </div>

      <div className="items-center w-full grid grid-cols-3 gap-4 mt-12">
        <div className="w-full bg-skin-muted border border-skin-stroke rounded-xl p-6">
          <ProgressBar
            label="For"
            type="success"
            value={forVotes}
            percentage={getVotePercentage(forVotes)}
          />
        </div>
        <div className="w-full bg-skin-muted border border-skin-stroke rounded-xl p-6">
          <ProgressBar
            label="Against"
            type="danger"
            value={againstVotes}
            percentage={getVotePercentage(againstVotes)}
          />
        </div>
        <div className="w-full bg-skin-muted border border-skin-stroke rounded-xl p-6">
          <ProgressBar
            label="Abstain"
            type="muted"
            value={abstainVotes}
            percentage={getVotePercentage(abstainVotes)}
          />
        </div>
      </div>

      <div className="items-center w-full grid gir sm:grid-cols-3 gap-4 mt-4">
        <div className="w-full border border-skin-stroke rounded-xl p-6 flex justify-between items-center sm:items-baseline">
          <div className="font-heading text-xl text-skin-muted">Threshold</div>
          <div className="text-right">
            <div className="text-skin-muted">Current Threshold</div>
            <div className="font-semibold">
              {proposal.proposal.quorumVotes || 1} Quorum
            </div>
          </div>
        </div>

        <div className="w-full border border-skin-stroke rounded-xl p-6 flex justify-between items-center sm:items-baseline">
          <div className="font-heading text-xl text-skin-muted">Ends</div>
          <div className="text-right">
            <div className="text-skin-muted">{getTime(voteEnd)}</div>
            <div className="font-semibold">{getDate(voteEnd)}</div>
          </div>
        </div>

        <div className="w-full border border-skin-stroke rounded-xl p-6 flex justify-between items-center sm:items-baseline">
          <div className="font-heading text-xl text-skin-muted">Snapshot</div>
          <div className="text-right">
            <div className="text-skin-muted">{getTime(voteStart)}</div>
            <div className="font-semibold">{getDate(voteStart)}</div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="text-2xl font-heading text-skin-muted">Description</div>

        <div
          className="prose prose-skin mt-4 prose-img:w-auto break-words"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(getProposalDescription(proposal.description), {
              allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
            }),
          }}
        />
      </div>
    </Layout>
  );
}

const VoteButton = () => {
  const { data: userBalance } = useTokenBalance({
    tokenContract: TOKEN_CONTRACT,
  });
  if (!userBalance || userBalance.lt(1)) return <Fragment />;
};

const ProgressBar = ({
  label,
  type,
  value,
  percentage,
}: {
  label: string;
  value: number;
  percentage: number;
  type: "success" | "danger" | "muted";
}) => {
  let textColor;
  let baseColor;
  let bgColor;

  switch (type) {
    case "success":
      textColor = "text-green-600";
      baseColor = "bg-green-600";
      bgColor = "bg-green-100";
      break;
    case "danger":
      textColor = "text-red-600";
      baseColor = "bg-red-600";
      bgColor = "bg-red-100";
      break;
    case "muted":
      textColor = "text-gray-500";
      baseColor = "bg-gray-600";
      bgColor = "bg-gray-200";
      break;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between mb-1">
        <div className={`${textColor} font-heading text-xl`}>{label}</div>
        <div className="font-semibold text-xl mt-4 sm:mt-0 text-center sm:text-left">
          {value}
        </div>
      </div>
      <div className={`w-full ${bgColor} rounded-full h-4 mt-4 sm:mt-0`}>
        <div
          className={`${baseColor} h-4 rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
