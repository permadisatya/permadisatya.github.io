import React, { useState } from "react";
import ThemeToggle from "./components/ThemeToggle";
import ProfileCard from "./components/ProfileCard";
import ProjectTimeline from "./components/ProjectTimeline";
import ProjectModal from "./components/ProjectModal";
import ProfileModal from "./components/ProfileModal";

export default function App(){
  const [view, setView] = useState("home");
  const [selected, setSelected] = useState(null);
  const [dark, setDark] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem('theme');
    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    const systemPrefersDark = mq ? mq.matches : false;
    const initial = stored ? stored === 'dark' : systemPrefersDark;

    setDark(initial);
    document.documentElement.classList.toggle('dark', initial);

    const handleSystemChange = (e) => {
      if (!localStorage.getItem('theme')) {
        const next = e.matches;
        setDark(next);
        document.documentElement.classList.toggle('dark', next);
      }
    };

    if (mq) {
      if (mq.addEventListener) mq.addEventListener('change', handleSystemChange);
      else mq.addListener(handleSystemChange);
    }

    return () => {
      if (mq) {
        if (mq.removeEventListener) mq.removeEventListener('change', handleSystemChange);
        else mq.removeListener(handleSystemChange);
      }
    };
  }, []);

  const toggleDark = () => {
    setDark(prev => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <div>
      <div className="min-h-screen transition-colors duration-300">
        <header className="py-8 px-6 max-w-[1200px] mx-auto flex justify-between items-center">
          <div className="font-bold text-lg">Portfolio</div>
          <ThemeToggle isDark={dark} toggle={toggleDark} />
        </header>

        <main className="max-w-[1200px] mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <aside className="lg:col-span-4">
              <ProfileCard onOpenProfile={() => setProfileModalOpen(true)} />
            </aside>
            <section className="lg:col-span-8">
              <ProjectTimeline onSelectProject={setSelected} />
            </section>
          </div>

          {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
          <ProfileModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
        </main>
      </div>
    </div>
  );
}
