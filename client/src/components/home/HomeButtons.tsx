"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/localStorage";

const HomeButtons = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setLogin(false);
    } else {
      setLogin(true);
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-x-6">
      {isLogin ? (
        <Link
          href="/users"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Show Users
        </Link>
      ) : (
        <>
          <Link
            href="/register"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </Link>
          <Link href="/login" className="text-sm font-semibold text-gray-900">
            Login <span aria-hidden="true">&rarr;</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default HomeButtons;
