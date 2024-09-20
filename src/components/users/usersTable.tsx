import React, { useState } from "react";
import { Lock, LockOpen, Trash2 } from "lucide-react";

const Table = () => {
  const [selectedIds, setSelectedIds] = useState<any>([]);
  const [selectAll, setSelectAll] = useState<any>(false);

  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      lastLogin: "2024-09-15",
      registration: "2024-07-10",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      lastLogin: "2024-09-12",
      registration: "2024-07-12",
      status: "Blocked",
    },
    {
      id: 3,
      name: "Sam Green",
      email: "sam@example.com",
      lastLogin: "2024-09-10",
      registration: "2024-07-11",
      status: "Active",
    },
  ];

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (id: any) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(
        selectedIds.filter((selectedId: any) => selectedId !== id)
      );
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBlock = () => {
    console.log("Block selected users: ", selectedIds);
  };

  const handleUnblock = () => {
    console.log("Unblock selected users: ", selectedIds);
  };

  const handleDelete = () => {
    console.log("Delete selected users: ", selectedIds);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Toolbar */}
      <div className="flex space-x-4">
        <button
          onClick={handleBlock}
          className="bg-red-500 flex items-center gap-2 text-white px-3 py-2 rounded hover:bg-red-600 cursor-pointer"
          disabled={selectedIds.length === 0}
        >
          <Lock className="w-4 h-4" />
          <p className="text-sm">Block</p>
        </button>
        <button
          onClick={handleUnblock}
          type="button"
          disabled={selectedIds.length === 0}
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 shadow-sm cursor-pointer ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <LockOpen className="w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          type="button"
          disabled={selectedIds.length === 0}
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 shadow-sm cursor-pointer ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

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
                      ID
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
                  {data.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(user.id)}
                          onChange={() => handleSelectRow(user.id)}
                        />
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.lastLogin}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.registration}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.status}
                      </td>
                    </tr>
                  ))}
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

// "use client";
// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/utils/firabase-config";

// const UsersTable = () => {
//   const [users, setUsers] = useState<any>([]);

//   const getUsers = async () => {
//     const querySnapshot = await getDocs(collection(db, "users"));
//     const users = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     setUsers(users);
//   };

//   useEffect(() => {
//     getUsers();
//   }, []);

//   return (
//     <div className="container mx-auto">
//       <table className="min-w-full">
//         <thead>
//           <tr>
//             <th>
//               <input type="checkbox" />
//             </th>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users?.map((user: any) => (
//             <tr key={user.id}>
//               <td>
//                 <input type="checkbox" />
//               </td>
//               <td>{user.id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.status}</td>
//               <td>
//                 <button>Block</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UsersTable;
