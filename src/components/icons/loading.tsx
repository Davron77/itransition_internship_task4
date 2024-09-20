import React from "react";

interface Props {
  className?: string;
}

const LoadingIcon: React.FC<Props> = ({ className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      className={` ${className}`}
      viewBox="0 0 16 16"
    >
      <g fill="#fff" fillRule="evenodd" clipRule="evenodd">
        <path
          d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
          opacity="0.2"
        ></path>
        <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"></path>
      </g>
    </svg>
  );
};

export default LoadingIcon;
