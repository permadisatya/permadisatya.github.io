import React, { useState } from "react";
import ThemeToggle from "./components/ThemeToggle";
import ProfileCard from "./components/ProfileCard";
import ProjectTimeline from "./components/ProjectTimeline";
import ProjectModal from "./components/ProjectModal";
import ProfileModal from "./components/ProfileModal";

export default function App(){
  const [selected, setSelected] = useState(null);
  const [dark, setDark] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // ... (Keep your existing useEffect for theme logic here) ...
  React.useEffect(() => {
    const stored = localStorage.getItem('theme');
    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    const systemPrefersDark = mq ? mq.matches : false;
    const initial = stored ? stored === 'dark' : systemPrefersDark;

    setDark(initial);
    document.documentElement.classList.toggle('dark', initial);
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
    // OUTER CONTAINER: Fixed height, no window scroll
    <div className="h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 overflow-hidden">
      
      {/* HEADER: Fixed at top */}
      <header className="flex-none py-4 px-6 border-b dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md flex justify-between items-center z-20">
        <div className="font-bold text-lg tracking-tight">Portfolio</div>
        <ThemeToggle isDark={dark} toggle={toggleDark} />
      </header>

      {/* MAIN: Splits into Sidebar and Content */}
      <main className="flex-1 flex overflow-hidden max-w-[1600px] w-full mx-auto">
        
        {/* SIDEBAR: Sticky/Fixed - Visible on Large Screens */}
        <aside className="hidden lg:block w-96 flex-none p-6 overflow-y-auto border-r dark:border-zinc-800 h-full scrollbar-thin">
          <ProfileCard onOpenProfile={() => setProfileModalOpen(true)} />
        </aside>

        {/* CONTENT AREA: Scrollable Independent of Sidebar */}
        <section className="flex-1 h-full overflow-y-auto p-6 scrollbar-hide" id="scroll-container">
          <div className="max-w-6xl mx-auto">
             {/* Mobile Profile Trigger (Optional if sidebar hidden) */}
             <div className="lg:hidden mb-6">
                <ProfileCard onOpenProfile={() => setProfileModalOpen(true)} />
             </div>
             
             <ProjectTimeline onSelectProject={setSelected} scrollContainerId="scroll-container" />
          </div>
        </section>
      </main>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      <ProfileModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
    </div>
  );
}