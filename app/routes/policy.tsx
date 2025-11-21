import type { Route } from "./+types/policy";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Privacy Policy - Golf Canada Dashboard" },
    { name: "description", content: "Privacy Policy for Golf Canada Dashboard" },
  ];
}

export default function Policy() {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    fetch("/content/privacy.md")
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((error) => console.error("Error loading privacy policy:", error));
  }, []);

  return (
    <div className="prose dark:prose-invert max-w-none">
      <Markdown>{content}</Markdown>
    </div>
  );
}
