export const getProposalName = (description: string) => {
  return description.split("&&")[0];
};
