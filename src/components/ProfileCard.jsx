import React, { useEffect, useState } from "react";
import MarkdownViewer from "./MarkdownViewer";
import { parse as parseYaml } from "yaml";
import { MapPin, Mail, Link as LinkIcon, Github, Linkedin, Twitter } from "lucide-react";

export default function ProfileCard({ onOpenProfile }) {
  const [md, setMd] = useState("");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const modules = import.meta.glob("/content/**/*.md", { as: "raw" });
    const path = "/content/profileCard.md";

    if (modules[path]) {
      modules[path]()
        .then((txt) => {
          const fmMatch = txt.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
          if (fmMatch) {
            try {
              const parsed = parseYaml(fmMatch[1]);
              setProfile(parsed && typeof parsed === "object" ? parsed : null);
            } catch {
              setProfile(null);
            }
            setMd(txt.slice(fmMatch[0].length));
          } else {
            setProfile(null);
            setMd(txt);
          }
        })
        .catch(() => {
          setMd("Failed to load profile card markdown.");
          setProfile(null);
        });
    } else {
      setMd("Profile card markdown not found in /content/profileCard.md");
      setProfile(null);
    }
  }, []);

  const get = (key) => {
    if (!profile) return undefined;
    if (profile[key]) return profile[key];
    if (profile.socials && profile.socials[key]) return profile.socials[key];
    return undefined;
  };

  const formatLabelFromUrl = (url) => {
    try {
      const u = new URL(url);
      const parts = u.pathname.replace(/\/+$/, "").split("/").filter(Boolean);
      if (parts.length) return parts[parts.length - 1];
      return u.hostname;
    } catch {
      return url;
    }
  };

  const renderContact = () => {
    if (!profile) return null;

    const website = get("website");
    const email = get("email");
    const location = get("location");
    const github = get("github");
    const linkedin = get("linkedin");
    const twitter = get("twitter");

    return (
      <div className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
        {location && (
          <div className="flex items-center gap-3">
            <MapPin size={16} />
            <span>{location}</span>
          </div>
        )}
        {email && (
          <div className="flex items-center gap-3">
            <Mail size={16} />
            <a href={`mailto:${email}`} className="underline">
              {email}
            </a>
          </div>
        )}
        {website && (
          <div className="flex items-center gap-3">
            <LinkIcon size={16} />
            <a href={website} target="_blank" rel="noopener noreferrer" className="underline">
              {formatLabelFromUrl(website)}
            </a>
          </div>
        )}

        {(github || linkedin || twitter) && (
          <div className="flex items-center gap-3 mt-2">
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:opacity-75">
                <Github size={18} />
                <span className="text-sm">{formatLabelFromUrl(github)}</span>
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:opacity-75">
                <Linkedin size={18} />
                <span className="text-sm">{formatLabelFromUrl(linkedin)}</span>
              </a>
            )}
            {twitter && (
              <a href={twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:opacity-75">
                <Twitter size={18} />
                <span className="text-sm">{formatLabelFromUrl(twitter)}</span>
              </a>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
        <div>
          <div className="text-lg font-semibold">{profile?.name ?? "Your Name"}</div>
          <div className="text-sm text-zinc-500">{profile?.role ?? "Full Stack Developer"}</div>
        </div>
      </div>

      <div className="mb-4">
        <MarkdownViewer content={md} className="prose-sm max-w-none" />
      </div>

      {renderContact()}

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onOpenProfile()}
          className="w-full py-2.5 px-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg font-semibold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors border border-transparent"
        >
          View Full Profile
        </button>
      </div>
    </div>
  );
}
