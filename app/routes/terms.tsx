import type { Route } from "./+types/terms";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Terms of Service - Golf Canada Dashboard" },
    { name: "description", content: "Terms of Service for Golf Canada Dashboard" },
  ];
}

export default function Terms() {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    fetch("/content/terms.md")
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((error) => console.error("Error loading terms of service:", error));
  }, []);

  return (
    <div className="prose dark:prose-invert max-w-none">
      <Markdown>{content}</Markdown>
    </div>
  );
}
