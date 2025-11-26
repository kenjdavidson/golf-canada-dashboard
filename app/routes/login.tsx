import { useState, useEffect } from 'react';
import type { Route } from "./+types/login";
import Markdown from "react-markdown";
import { Link, useNavigate } from "react-router";
import { LoginForm } from "../components/LoginForm";
import { useLoginMutation } from "../store/api/auth";
import { useSelector } from "react-redux";
import { selectAuthStatus } from "../store/auth/selectors";
import { AuthStatus } from "../store/auth/types";
import loginContent from "../../content/login.md?raw";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - Golf Canada Dashboard" },
    { name: "description", content: "Login to Golf Canada Dashboard" },
  ];
}

export default function Login() {
  const [login, { isLoading, error }] = useLoginMutation();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const authStatus = useSelector(selectAuthStatus);
  const navigate = useNavigate();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (authStatus === AuthStatus.AUTHENTICATED) {
      navigate('/');
    }
  }, [authStatus, navigate]);

  const handleSubmit = async (username: string, password: string) => {
    setErrorMessages([]);
    try {
      await login({ username, password }).unwrap();
      // On success, the user will be redirected by the useEffect above
    } catch (err: any) {
      // Handle login errors
      const messages: string[] = [];
      
      if (err?.status === 400) {
        messages.push('Invalid username or password. Please check your credentials and try again.');
      } else if (err?.status === 401) {
        messages.push('Authentication failed. Please verify your Golf Canada credentials.');
      } else if (err?.status === 429) {
        messages.push('Too many login attempts. Please try again later.');
      } else if (err?.status >= 500) {
        messages.push('Server error. Please try again later.');
      } else if (err?.message) {
        messages.push(err.message);
      } else {
        messages.push('An unexpected error occurred. Please try again.');
      }
      
      setErrorMessages(messages);
    }
  };

  const handleClear = () => {
    setErrorMessages([]);
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-8 max-w-6xl mx-auto">
      {/* Left Column - Login Information */}
      <div className="flex-1 prose dark:prose-invert max-w-none">
        <Markdown
          components={{
            a: ({ href, children, ...props }) => {
              // Use Link component for internal links
              if (href?.startsWith('/')) {
                return (
                  <Link to={href} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {children}
                  </Link>
                );
              }
              // External links
              return (
                <a href={href} {...props} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              );
            },
          }}
        >
          {loginContent}
        </Markdown>
      </div>

      {/* Right Column - Login Form */}
      <div className="flex-1 max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Sign In
          </h2>
          <LoginForm
            onSubmit={handleSubmit}
            onClear={handleClear}
            errorMessages={errorMessages}
          />
          {isLoading && (
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Signing in...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
