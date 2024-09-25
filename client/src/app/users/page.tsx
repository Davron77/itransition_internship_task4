"use client";

import React from "react";
import withAuth from "@/layout/withAuth";
import UsersTable from "@/components/users/usersTable";

const Users = () => {
  return (
    <>
      <UsersTable />
    </>
  );
};

export default withAuth(Users);
