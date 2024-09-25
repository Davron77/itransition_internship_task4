import { User } from "@/api/types";
import { formatDate } from "@/utils/format";
import React from "react";

interface Props {
  selectAll: boolean;
  handleSelectAll: () => void;
  handleSelectRow: (user: User) => void;
  selected: User[];
  users: User[];
  loading: boolean;
}

const UserList: React.FC<Props> = ({
  selectAll,
  handleSelectAll,
  handleSelectRow,
  selected,
  users,
  loading,
}) => {
  return (
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
  );
};

export default UserList;
