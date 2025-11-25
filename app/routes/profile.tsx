import type { Route } from "./+types/profile";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Profile - Golf Canada Dashboard" },
    { name: "description", content: "Your Golf Canada profile" },
  ];
}

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Profile
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Your profile page is coming soon.
      </p>
    </div>
  );
}
