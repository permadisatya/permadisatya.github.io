import React from "react";
import SimpleMarkdownRenderer from "./SimpleMarkdownRenderer";
import MarkdownViewer from "./MarkdownViewer";
import ModalWrapper from "./ModalWrapper";

const ProjectModal = ({ project, onClose }) => {
  return (
    <ModalWrapper isOpen={!!project} onClose={onClose}>
      {project && (
        <>
          {/* Fixed Header */}
          <div className="p-8 pb-6 border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 z-10">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              {project.date}
            </span>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mt-2 mb-4 pr-8">
              {project.title}
            </h2>

            <div className="flex flex-wrap gap-2">
              {(project.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full border border-zinc-200 dark:border-zinc-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="p-8 pt-6 overflow-y-auto flex-1">
            <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none">
              {project.markdownPath ? (
                <MarkdownViewer src={project.markdownPath} />
              ) : (
                <MarkdownViewer content={project.content || ""} />
              )}
            </div>
          </div>
        </>
      )}
    </ModalWrapper>
  );
};

export default ProjectModal;