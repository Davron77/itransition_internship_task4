"use client";

import React from "react";
import withAuth from "@/layout/withAuth";
import UserTable from "../../components/users/UsersTable";

const Users = () => {
  return (
    <>
      <UserTable />
    </>
  );
};

export default withAuth(Users);
