"use client";

import AdminPanel from "@/components/admin/adminPanel";
import withAuth from "@/layout/withAuth";
import React from "react";

const Admin = () => {
  return (
    <>
      <AdminPanel />
    </>
  );
};

export default withAuth(Admin);
