import React, { useEffect } from "react";
import { X } from "lucide-react";

const ModalWrapper = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm">
      {/* Main Container */}
      <div className="bg-white dark:bg-zinc-900 w-full max-w-[1000px] max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col relative ring-1 ring-zinc-200 dark:ring-zinc-800">
        
        {/* Global Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            className="p-2 bg-zinc-100/50 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Injection */}
        {children}
      </div>

      {/* Backdrop Click */}
      <div className="absolute inset-0 -z-10" onClick={onClose}></div>
    </div>
  );
};

export default ModalWrapper;