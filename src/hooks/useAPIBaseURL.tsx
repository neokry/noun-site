const useAPIBaseURL = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV == "production")
    return "https://" + process.env.NEXT_PUBLIC_DEPLOYMENT_URL;
  else return "";
};

export default useAPIBaseURL;
