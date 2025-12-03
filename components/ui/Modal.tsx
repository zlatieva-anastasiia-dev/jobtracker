"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "./Button";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export function Modal({ children, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white p-6 rounded-2xl max-w-2xl w-full text-black mx-4 max-h-[90vh] overflow-y-auto"
        tabIndex={-1}
        ref={modalRef}
      >
        <Button
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </Button>

        {children}
      </div>
    </div>,
    document.body,
  );
}
