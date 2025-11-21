import { useEffect, useState } from "react";

export function useMarkdownContent(url: string): string {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => setContent(text))
      .catch((error) => console.error("Error loading markdown content:", error));
  }, [url]);

  return content;
}
