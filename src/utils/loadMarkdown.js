
export const loadMarkdown = async (path) => {
  const res = await fetch(path);
  return await res.text();
};
