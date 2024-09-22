"use client";

import React, { useState, useEffect } from "react";
import UsersTable from "@/components/users/usersTable";
import withAuth from "@/layout/withAuth";
import { fetchUsers } from "@/api/user";

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any>([]);

  const getUsers = async () => {
    setLoading(true);
    const response = await fetchUsers();

    setUsers(response);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <UsersTable
        users={users}
        loading={loading}
        getUsers={getUsers}
        setLoading={setLoading}
      />
    </>
  );
};

export default withAuth(Users);
