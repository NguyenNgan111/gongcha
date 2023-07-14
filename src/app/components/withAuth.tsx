"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(Component: any) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const userIsAuthenticated = localStorage.getItem("token") !== null;

    useEffect(() => {
      if (!userIsAuthenticated) {
        router.push("/account/login");
      }
    }, [userIsAuthenticated, router]);

    return <Component {...props} />;
  };
}
