
import { parse } from "yaml";

export const loadProfile = async () => {
  const files = import.meta.glob('/content/profile.md', { as: 'raw' });
  const paths = Object.keys(files || {});
  if (paths.length === 0) return null;
  const raw = await files[paths[0]]();
  const fm = raw.match(/---([\s\S]*?)---/);
  const body = raw.replace(/---([\s\S]*?)---/, '').trim();
  let meta = {};
  if (fm) {
    meta = parse(fm[1]);
  }
  return { ...meta, content: body };
};
