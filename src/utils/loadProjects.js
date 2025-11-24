
import { parse } from "yaml";

export const loadProjects = async () => {
  const files = import.meta.glob('/content/projects/*.md', { as: 'raw' });
  const projects = [];
  for (const path in files) {
    const raw = await files[path]();
    const fmMatch = raw.match(/---([\s\S]*?)---/);
    const body = raw.replace(/---([\s\S]*?)---/, '').trim();
    let meta = {};
    if (fmMatch) {
      meta = parse(fmMatch[1]);
    }
    // Build excerpt from first non-empty paragraph if not provided
    const excerpt = (body.split('\n').find(l => l.trim()) || '').slice(0, 240);
    projects.push({ ...meta, content: body, excerpt, mdPath: path });
  }
  projects.sort((a,b) => new Date(b.date) - new Date(a.date));
  return projects;
};
