
import React, { useEffect, useState, useRef, useCallback } from "react";
import { loadProjects } from "../utils/loadProjects";
import TimelineItem from "./TimelineItem";

const ProjectTimeline = ({ onSelectProject }) => {
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loadingMore, setLoadingMore] = useState(false);
  const observerTarget = useRef(null);

  useEffect(() => {
    loadProjects().then(setProjects);
  }, []);

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  const handleObserver = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && hasMore && !loadingMore) {
      setLoadingMore(true);
      setTimeout(() => {
        setVisibleCount((v) => Math.min(v + 5, projects.length));
        setLoadingMore(false);
      }, 600);
    }
  }, [hasMore, loadingMore, projects.length]);

  useEffect(() => {
    const obs = new IntersectionObserver(handleObserver, { root: null, rootMargin: "20px", threshold: 1.0 });
    if (observerTarget.current) obs.observe(observerTarget.current);
    return () => obs.disconnect();
  }, [handleObserver]);

  return (
    <div>
      {visibleProjects.map((p) => <TimelineItem key={p.mdPath || p.title} project={p} onSelect={onSelectProject} />)}
      <div ref={observerTarget} className="h-10 flex items-center justify-center mt-4">
        {loadingMore && <div className="text-sm text-zinc-500 dark:text-zinc-400">Loading more...</div>}
      </div>
    </div>
  );
};

export default ProjectTimeline;
