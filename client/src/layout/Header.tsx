"use client";

import React, { useState, useEffect } from "react";
import { getToken } from "@/utils/localStorage";
import { UserData } from "@/utils/types";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>();

  const logoutHandler = () => {
    localStorage.removeItem("userData");
    router.push("/login");
  };

  useEffect(() => {
    const userData = getToken();
    if (userData) {
      setUserData(userData);
    }
  }, []);

  return (
    <div className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 pr-2">
            <p className="text-gray-300">
              Signed in as <strong>{userData ? userData?.email : ""}</strong>
            </p>
            <button
              onClick={logoutHandler}
              className={
                "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
              }
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
