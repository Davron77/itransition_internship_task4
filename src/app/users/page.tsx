"use client";

import UsersTable from "@/components/users/usersTable";
import withAuth from "@/layout/withAuth";
import React from "react";

const Users = () => {
  return (
    <>
      <UsersTable />
    </>
  );
};

export default withAuth(Users);
