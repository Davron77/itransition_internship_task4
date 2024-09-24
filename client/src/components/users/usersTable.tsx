"use client";
import React, { useState, useEffect } from "react";
import Toolbar from "./Toolbar";
import { formatDate } from "@/utils/format";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firabase-config";

interface User {
  id: number;
  name: string;
  email: string;
  last_login_at: string;
  created_at: string;
  status: string;
}

const Table = () => {
  const [selected, setSelected] = useState<any>([]);
  const [selectAll, setSelectAll] = useState<any>(false);

  const [loading, setLoading] = useState(true);
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
      {/* Toolbar */}
      <Toolbar
        selected={selected}
        setSelected={setSelected}
        setLoading={setLoading}
        setSelectAll={setSelectAll}
      />
      {/* Table */}
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      E-mail
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registration Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr className="flex justify-center w-full">
                      <td className="px-6 py-4">
                        <h1>Loading users...</h1>
                      </td>
                    </tr>
                  ) : (
                    users?.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selected.includes(user)}
                            onChange={() => handleSelectRow(user)}
                          />
                        </td>
                        {/* <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {user.id}
                        </td> */}
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(user.last_login_at)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(user.created_at)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {user.status}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
