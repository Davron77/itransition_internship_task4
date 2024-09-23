import Header from "@/layout/Header";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default UserLayout;
