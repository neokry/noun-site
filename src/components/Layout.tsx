import React, { Fragment } from "react";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
}
