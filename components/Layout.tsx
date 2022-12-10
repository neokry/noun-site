import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-skin-backdrop text-skin-base min-h-screen flex items-center justify-around">
      <div className="max-w-[1400px] flex flex-col items-center justify-around">
        <Header />
        <div className="p-6 lg:px-12 xl:px-24 mt-8 w-full">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
