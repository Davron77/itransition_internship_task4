"use client";
import React, { useState, useEffect } from "react";
import Toolbar from "./Toolbar";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firabase-config";
import UserList from "./UserList";
import { User } from "@/api/types";

const UsersTable = () => {
  const [selected, setSelected] = useState<User[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapShot: any) => {
        let list: User[] = [];

        snapShot.docs.forEach((doc: any) => {
          list.push({ id: doc.id, ...doc.data() } as User);
        });

        setUsers(list);
        setLoading(false);
        console.log("list", list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelected([]);
    } else {
      setSelected(users?.map((item) => item));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (user: any) => {
    if (selected.includes(user)) {
      setSelected(
        selected.filter((selectedId: any) => selectedId?.id !== user?.id)
      );
    } else {
      setSelected([...selected, user]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <Toolbar
        selected={selected}
        setSelected={setSelected}
        setLoading={setLoading}
        selectAll={selectAll}
        setSelectAll={setSelectAll}
      />
      <UserList
        selectAll={selectAll}
        handleSelectAll={handleSelectAll}
        handleSelectRow={handleSelectRow}
        selected={selected}
        users={users}
        loading={loading}
      />
    </div>
  );
};

export default UsersTable;
