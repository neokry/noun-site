import Header from "components/Header";
import { useIsMounted } from "hooks/useIsMounted";
import { Fragment } from "react";
import Hero from "components/Hero";

export default function Site() {
  const isMounted = useIsMounted();

  if (!isMounted) return <Fragment />;

  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}
