import React, { useEffect, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // Changed to github-dark for better match in dark mode, or stick to standard and override

function escapeHtml(str = "") {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Helper to strip YAML frontmatter (metadata between --- and ---)
function stripFrontmatter(content) {
  if (!content) return "";
  // Regex matches content starting with ---, followed by anything, ending with ---
  return content.replace(/^---\n[\s\S]*?\n---\n/, "");
}

export default function MarkdownViewer({ src, content = "", className = "" }) {
  const [md, setMd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMd = useCallback(async (url) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

      const contentType = res.headers.get("content-type") || "";
      const text = await res.text();

      if (contentType.includes("text/html") || /^\s*<!doctype/i.test(text)) {
        throw new Error("Markdown not found (received HTML).");
      }

      // Strip YAML before setting state
      setMd(stripFrontmatter(text));
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (src) {
      fetchMd(src);
    } else {
      // Strip YAML if content is passed directly
      setMd(stripFrontmatter(content || ""));
    }
  }, [src, content, fetchMd]);

  const components = {
    // 1. GitHub-style Code Blocks
    code: ({ node, inline, className, children, ...props }) => {
      const codeText = String(children).replace(/\n$/, "");
      
      // Inline code (like `variable`)
      if (inline) {
        return (
          <code 
            className="px-1.5 py-0.5 mx-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[85%] font-mono text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700" 
            {...props}
          >
            {children}
          </code>
        );
      }

      // Block code
      const langMatch = /language-([^\s]+)/.exec(className || "");
      const lang = langMatch ? langMatch[1].toLowerCase() : null;

      let highlighted = "";
      try {
        if (lang && hljs.getLanguage(lang)) {
          highlighted = hljs.highlight(codeText, { language: lang }).value;
        } else {
          highlighted = hljs.highlightAuto(codeText).value;
        }
      } catch (e) {
        highlighted = escapeHtml(codeText);
      }

      return (
        <div className="my-6 rounded-md overflow-hidden bg-[#f6f8fa] dark:bg-[#0d1117] border border-zinc-200 dark:border-zinc-800">
          {/* Optional: Header for language label could go here */}
          <div className="overflow-x-auto p-4">
            <pre className={`text-[13px] leading-snug font-mono text-zinc-800 dark:text-zinc-300 ${className}`} style={{ margin: 0 }}>
              <code dangerouslySetInnerHTML={{ __html: highlighted }} />
            </pre>
          </div>
        </div>
      );
    },

    // 2. Responsive Images
    img: ({ src, alt, title }) => (
      <img 
        src={src} 
        alt={alt} 
        title={title} 
        className="w-full h-auto rounded-lg border border-zinc-200 dark:border-zinc-800 my-6" 
        loading="lazy" 
      />
    ),

    // 3. Blockquotes (GitHub style)
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-700 pl-4 py-1 text-zinc-500 dark:text-zinc-400 italic my-4">
        {children}
      </blockquote>
    ),
  };

  return (
    <div className={`prose prose-zinc dark:prose-invert max-w-none ${className}`}>
      {loading && <div className="py-8 text-center text-zinc-400">Loading content...</div>}
      {error && <div className="text-red-500 text-sm p-4 bg-red-50 dark:bg-red-900/10 rounded">{error}</div>}
      {md && (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={components}
        >
          {md}
        </ReactMarkdown>
      )}
    </div>
  );
}