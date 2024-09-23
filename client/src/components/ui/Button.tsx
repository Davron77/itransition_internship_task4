import React from "react";
import LoadingIcon from "../icons/loading";

interface Props {
  className?: string;
  loading?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<Props> = ({ className = "", loading, children }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className} ${
        loading ? "cursor-not-allowed opacity-75" : ""
      }`}
    >
      {loading && <LoadingIcon className="mr-2 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;
