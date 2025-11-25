import { useEffect } from 'react';
import type { Route } from "./+types/home";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectAuthStatus } from "../store/auth/selectors";
import { AuthStatus } from "../store/auth/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Golf Canada Dashboard" },
    { name: "description", content: "Golf Canada Dashboard" },
  ];
}

export default function Home() {
  const authStatus = useSelector(selectAuthStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === AuthStatus.AUTHENTICATED) {
      navigate('/profile', { replace: true });
    } else if (authStatus === AuthStatus.UNAUTHENTICATED) {
      navigate('/login', { replace: true });
    }
    // Do nothing while AUTHENTICATING - wait for auth state to resolve
  }, [authStatus, navigate]);

  // Show loading state while auth status is being determined
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-gray-600 dark:text-gray-400">
        Loading...
      </div>
    </div>
  );
}
