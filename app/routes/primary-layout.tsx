import { Outlet } from "react-router";
import { Navigation } from "../components/Navigation";

export default function PrimaryLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4">
          <Navigation />
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
