export const getProposalDescription = (description: string) => {
  return description.split("&&")[1];
};
