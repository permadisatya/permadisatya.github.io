import React from 'react';
import ProjectCard from './ProjectCard';

export default function ProjectList({ projects, onOpenProfile }) {
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpenProfile={onOpenProfile} />
        ))}
      </div>
    </div>
  );
}