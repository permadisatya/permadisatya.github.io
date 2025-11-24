
import React from "react";

const TimelineItem = ({ project, onSelect }) => {
  return (
    <div className="pb-6 group">
      <button onClick={() => onSelect(project)} className="w-full text-left group/card focus:outline-none">
        <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 p-6 shadow-sm dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors group-focus/card:ring-2 group-focus/card:ring-zinc-900 dark:group-focus/card:ring-white">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-500 mb-1 block">{project.date}</span>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover/card:underline decoration-2 underline-offset-4 transition-all">{project.title}</h3>
            </div>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 font-medium">
            {project.excerpt || (project.content || "").split("\n").find(l => l.trim()) || "No description available."}
          </p>

          <div className="flex flex-wrap gap-2">
            {(project.tags || []).map(tag => <span key={tag} className="px-2.5 py-1 text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-lg border border-zinc-200 dark:border-zinc-700">{tag}</span>)}
          </div>
        </div>
      </button>
    </div>
  );
};

export default TimelineItem;
