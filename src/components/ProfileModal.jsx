import React from "react";
import MarkdownViewer from "./MarkdownViewer";
import ModalWrapper from "./ModalWrapper";

export default function ProfileModal({ isOpen, onClose }) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      {/* Single Scrollable Area */}
      <div className="p-8 pt-16 overflow-y-auto flex-1">
        <MarkdownViewer src="/content/profile.md" />
      </div>
    </ModalWrapper>
  );
}