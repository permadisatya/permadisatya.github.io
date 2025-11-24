
import React from "react";

const SimpleMarkdownRenderer = ({ content }) => {
  const lines = (content || "").split("\n");
  return (
    <div className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
      {lines.map((line, idx) => {
        if (line.startsWith('# ')) return <h1 key={idx} className="text-2xl font-bold mt-6 mb-4 text-zinc-900 dark:text-white">{line.replace('# ', '')}</h1>;
        if (line.startsWith('## ')) return <h2 key={idx} className="text-xl font-semibold mt-6 mb-3 text-zinc-800 dark:text-zinc-100">{line.replace('## ', '')}</h2>;
        if (line.startsWith('### ')) return <h3 key={idx} className="text-lg font-medium mt-4 mb-2 text-zinc-800 dark:text-zinc-100">{line.replace('### ', '')}</h3>;
        if (line.startsWith('- ')) return <li key={idx} className="ml-4 list-disc pl-1 marker:text-zinc-400">{line.replace('- ', '')}</li>;
        if (line.trim() === '') return <div key={idx} className="h-2"></div>;
        return <p key={idx}>{line}</p>;
      })}
    </div>
  );
};

export default SimpleMarkdownRenderer;
