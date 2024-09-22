import React, { useState } from "react";
import Toolbar from "./Toolbar";
import { formatDate } from "@/utils/format";

interface User {
  id: number;
  name: string;
  email: string;
  last_login_at: string;
  created_at: string;
  status: string;
}

interface Props {
  loading: boolean;
  users: User[];
  getUsers: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Table: React.FC<Props> = ({ users, loading, getUsers, setLoading }) => {
  const [selectedIds, setSelectedIds] = useState<any>([]);
  const [selectAll, setSelectAll] = useState<any>(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(users?.map((item) => item.id));
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

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Toolbar */}
      <Toolbar
        selectedIds={selectedIds}
        getUsers={getUsers}
        setSelectedIds={setSelectedIds}
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
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th> */}
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
                            checked={selectedIds.includes(user.id)}
                            onChange={() => handleSelectRow(user.id)}
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
