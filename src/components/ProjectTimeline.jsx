import React, { useEffect, useState, useRef, useCallback } from "react";
import { loadProjects } from "../utils/loadProjects";
import TimelineItem from "./TimelineItem";

const ProjectTimeline = ({ onSelectProject, scrollContainerId }) => {
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9); // Multiple of 3 for grid
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
        setVisibleCount((v) => Math.min(v + 6, projects.length));
        setLoadingMore(false);
      }, 600);
    }
  }, [hasMore, loadingMore, projects.length]);

  useEffect(() => {
    // CRITICAL: Use the scroll container as root, otherwise observer fails in fixed layout
    const root = document.getElementById(scrollContainerId);
    
    const obs = new IntersectionObserver(handleObserver, { 
      root: root || null, 
      rootMargin: "100px", 
      threshold: 0.1 
    });
    
    if (observerTarget.current) obs.observe(observerTarget.current);
    return () => obs.disconnect();
  }, [handleObserver, scrollContainerId]);

  return (
    <div>
      {/* GRID LAYOUT: 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {visibleProjects.map((p) => (
          <TimelineItem key={p.mdPath || p.title} project={p} onSelect={onSelectProject} />
        ))}
      </div>
      
      <div ref={observerTarget} className="h-20 flex items-center justify-center mt-8 w-full">
        {loadingMore && (
           <div className="animate-pulse text-zinc-400 text-sm font-medium">Loading projects...</div>
        )}
      </div>
    </div>
  );
};

export default ProjectTimeline;