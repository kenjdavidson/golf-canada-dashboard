import type { Route } from "./+types/policy";
import Markdown from "react-markdown";
import { useMarkdownContent } from "../hooks/useMarkdownContent";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Privacy Policy - Golf Canada Dashboard" },
    { name: "description", content: "Privacy Policy for Golf Canada Dashboard" },
  ];
}

export default function Policy() {
  const content = useMarkdownContent("/content/privacy.md");

  return (
    <div className="prose dark:prose-invert max-w-none">
      <Markdown>{content}</Markdown>
    </div>
  );
}
