"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firabase-config";
import UsersTable from "@/components/users/usersTable";
import withAuth from "@/layout/withAuth";

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any>([]);

  const getUsers = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(users);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("somothing went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  console.log("users", users);

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
