// Example for fetching and displaying users
"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "@/utils/firabase-config";
import { onAuthStateChanged } from "firebase/auth";
import adminAuth from "@/utils/firabase-admin-config";
import { getAuth } from "firebase-admin/auth";
// import { getAuth } from "firebase-admin/auth";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  //   useEffect(() => {

  //   }, []);

  return (
    <div className="container mx-auto">
      {/* <table className="min-w-full">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => handleBlockUser(user.id)}>Block</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default AdminPanel;
