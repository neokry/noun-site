import { BuilderSDK } from "@buildersdk/sdk";
import DefaultProvider from "@/utils/DefaultProvider";
import { BigNumber } from "ethers";

const { governor } = BuilderSDK.connect({ signerOrProvider: DefaultProvider });

export type Proposal = {
  proposalId: `0x${string}`;
  targets: `0x${string}`[];
  values: number[];
  calldatas: `0x${string}`[];
  description: string;
  descriptionHash: `0x${string}`;
  proposal: ProposalDetails;
  state: number;
};

export type ProposalDetails = {
  proposer: `0x${string}`;
  timeCreated: number;
  againstVotes: number;
  forVotes: number;
  abstainVotes: number;
  voteStart: number;
  voteEnd: number;
  proposalThreshold: number;
  quorumVotes: number;
  executed: boolean;
  canceled: boolean;
  vetoed: boolean;
};

export const getUserVotes = async ({
  address,
  user,
  timestamp,
}: {
  address: string;
  user: `0x${string}`;
  timestamp: number;
}) => {
  return governor({ address }).getVotes(user, BigNumber.from(timestamp));
};

export const getProposalThreshold = async ({
  address,
}: {
  address: string;
}) => {
  return governor({ address }).proposalThreshold();
};

export const getProposalState = async ({
  address,
  proposalId,
}: {
  address: `0x${string}`;
  proposalId: `0x${string}`;
}) => {
  return governor({ address }).state(proposalId);
};

export const getProposalDetails = async ({
  address,
  proposalId,
}: {
  address: `0x${string}`;
  proposalId: `0x${string}`;
}): Promise<ProposalDetails> => {
  const {
    proposer,
    timeCreated,
    againstVotes,
    forVotes,
    abstainVotes,
    voteStart,
    voteEnd,
    proposalThreshold,
    quorumVotes,
    executed,
    canceled,
    vetoed,
  } = await governor({ address }).getProposal(proposalId);

  return {
    proposer,
    timeCreated,
    againstVotes,
    forVotes,
    abstainVotes,
    voteStart,
    voteEnd,
    proposalThreshold,
    quorumVotes,
    executed,
    canceled,
    vetoed,
  };
};

export const getProposals = async ({ address }: { address: `0x${string}` }) => {
  const governorContract = governor({ address });
  const filter = governorContract.filters.ProposalCreated(
    null,
    null,
    null,
    null,
    null,
    null,
    null
  );

  const events = await governorContract.queryFilter(filter);
  const proposalResponse = await Promise.all(
    events.map(async (event) => {
      const { proposalId, targets, calldatas, description, descriptionHash } =
        event.args as any;

      const [proposal, state] = await Promise.all([
        getProposalDetails({ address, proposalId }),
        getProposalState({ address, proposalId }),
      ]);

      // Get from array becuase of ethers naming collision
      const values = (event.args as any)[2];

      return {
        proposalId,
        targets,
        values,
        calldatas,
        description,
        descriptionHash,
        proposal,
        state,
      } as Proposal;
    })
  );

  return proposalResponse.sort(
    (a, b) => b.proposal.timeCreated - a.proposal.timeCreated
  );
};
