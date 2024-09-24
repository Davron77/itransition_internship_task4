"use client";

import React from "react";
import UsersTable from "@/components/users/usersTable";
import withAuth from "@/layout/withAuth";

const Users = () => {
  return (
    <>
      <UsersTable />
    </>
  );
};

export default withAuth(Users);
