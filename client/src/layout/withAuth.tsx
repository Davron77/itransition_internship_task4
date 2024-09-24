"use client";
import { useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/localStorage";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = getToken();

      if (!token) {
        router.push("/login");
        setLoading(false);
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
