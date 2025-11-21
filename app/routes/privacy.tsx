import type { Route } from "./+types/privacy";
import Markdown from "react-markdown";
import privacyContent from "../../content/privacy.md?raw";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Privacy Policy - Golf Canada Dashboard" },
    { name: "description", content: "Privacy Policy for Golf Canada Dashboard" },
  ];
}

export default function Privacy() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <Markdown>{privacyContent}</Markdown>
    </div>
  );
}
