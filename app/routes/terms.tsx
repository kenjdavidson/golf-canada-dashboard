import type { Route } from "./+types/terms";
import Markdown from "react-markdown";
import termsContent from "../../content/terms.md?raw";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Terms of Service - Golf Canada Dashboard" },
    { name: "description", content: "Terms of Service for Golf Canada Dashboard" },
  ];
}

export default function Terms() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <Markdown>{termsContent}</Markdown>
    </div>
  );
}
