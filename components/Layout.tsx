import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-skin-muted min-h-screen">
      <Header />
      <div className="p-6 sm:px-52 mt-8">{children}</div>
      <Footer />
    </div>
  );
}
