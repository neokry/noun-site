import Layout from "@/components/Layout";
import { Proposal } from "@/services/nouns-builder/governor";
import { TOKEN_CONTRACT } from "constants/addresses";
import Link from "next/link";
import { Fragment } from "react";
import { useDAOAddresses, useGetAllProposals } from "hooks";
import { getProposalName } from "@/utils/getProposalName";
import ProposalStatus from "@/components/ProposalStatus";

export default function Vote() {
  const { data: addresses } = useDAOAddresses({
    tokenContract: TOKEN_CONTRACT,
  });
  const { data: proposals } = useGetAllProposals({
    governorContract: addresses?.governor,
  });

  const getProposalNumber = (i: number) => {
    if (!proposals) return 0;
    return proposals.length - i;
  };

  return (
    <Layout>
      <div className="text-2xl font-heading text-skin-muted">Governance</div>

      <div className="mt-8">
        <div className="text-4xl font-heading text-skin-base">Proposals</div>
        <div>
          {proposals?.map((x, i) => (
            <ProposalPlacard
              key={i}
              proposal={x}
              proposalNumber={getProposalNumber(i)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

const ProposalPlacard = ({
  proposal,
  proposalNumber,
}: {
  proposal: Proposal;
  proposalNumber: number;
}) => {
  return (
    <Link
      href={`/vote/${proposal.proposalId}`}
      className="flex items-center justify-between w-full bg-skin-fill hover:bg-skin-muted border border-skin-stroke p-4 my-4 rounded-2xl"
    >
      <div className="flex items-center">
        <div className="text-xl font-semibold mr-6 text-skin-muted">
          {proposalNumber}
        </div>
        <div className="text-xl font-semibold text-skin-base">
          {getProposalName(proposal.description)}
        </div>
      </div>
      <ProposalStatus proposal={proposal} />
    </Link>
  );
};
