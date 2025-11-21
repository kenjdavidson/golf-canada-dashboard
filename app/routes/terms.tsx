import type { Route } from "./+types/terms";
import Markdown from "react-markdown";
import { useMarkdownContent } from "../hooks/useMarkdownContent";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Terms of Service - Golf Canada Dashboard" },
    { name: "description", content: "Terms of Service for Golf Canada Dashboard" },
  ];
}

export default function Terms() {
  const content = useMarkdownContent("/content/terms.md");

  return (
    <div className="prose dark:prose-invert max-w-none">
      <Markdown>{content}</Markdown>
    </div>
  );
}
