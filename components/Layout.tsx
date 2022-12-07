import React, { Fragment } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-skin-backdrop min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
