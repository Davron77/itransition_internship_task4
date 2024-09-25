"use client";

import React from "react";
import withAuth from "@/layout/withAuth";
import UserTable from "../../components/users/UserTable";

const Users = () => {
  return (
    <>
      <UserTable />
    </>
  );
};

export default withAuth(Users);
