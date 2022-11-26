const parseBase64String = (val: string) => {
  const clean: string = val?.substring(29);
  const json = Buffer.from(clean, "base64").toString();
  return JSON.parse(json);
};

export default parseBase64String;
