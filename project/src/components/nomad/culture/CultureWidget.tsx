"use client";

import { useEffect, useRef, useState } from "react";
import { MaterialIcon } from "../icons/MaterialIcon";
import { ChatBubble } from "./ChatBubble";
import { ChatComposer } from "./ChatComposer";
import { WidgetHeader } from "./WidgetHeader";
import { cultureCopy } from "./cultureCopy";
import { useChat } from "@/lib/culture/useChat";
import type { Language } from "../types";

/**
 * Floating culture chatbot, docked bottom-right. A FAB opens a glassy chat
 * panel (near full-screen on mobile, a 400px dock on desktop). Lives above all
 * screens so the advisor is always one tap away.
 */
export function CultureWidget({ language }: { language: Language }) {
  const [open, setOpen] = useState(false);
  const t = cultureCopy[language];

  return (
    <>
      {!open && <Fab label={t.title} onClick={() => setOpen(true)} />}
      {open && <Panel language={language} onClose={() => setOpen(false)} />}
    </>
  );
}

function Fab({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="animate-float fixed bottom-24 right-4 z-50 flex items-center gap-2 rounded-full bg-linear-to-br from-[#00658b] via-[#0a86b8] to-[#e0a32e] px-4 py-3.5 text-white shadow-2xl shadow-[#00658b]/40 transition hover:scale-105 lg:bottom-6 lg:right-6"
    >
      <span className="pulse-ring relative grid size-7 place-items-center rounded-full">
        <MaterialIcon name="chat" className="size-6" />
      </span>
      <span className="hidden text-sm font-black tracking-tight sm:block">{label}</span>
    </button>
  );
}

function Panel({ language, onClose }: { language: Language; onClose: () => void }) {
  const t = cultureCopy[language];
  const { messages, streaming, error, send } = useChat(language, t.greeting);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm sm:pointer-events-none sm:bg-transparent sm:backdrop-blur-0"
        onClick={onClose}
      />
      <div className="glass-panel animate-fade-up fixed inset-3 top-20 z-50 flex flex-col overflow-hidden rounded-[28px] sm:inset-auto sm:bottom-6 sm:right-6 sm:top-auto sm:h-[70vh] sm:max-h-[640px] sm:w-[400px]">
        <WidgetHeader language={language} onClose={onClose} />

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          {messages.map((m, i) => (
            <ChatBubble key={m.id} message={m} streaming={streaming && i === messages.length - 1} />
          ))}
          {error && (
            <p className="rounded-2xl bg-red-500/10 px-4 py-2.5 text-center text-xs font-bold text-red-600 dark:text-red-400">
              {error === "rate-limit" ? t.errorRate : t.errorFail}
            </p>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-white/15 px-3 py-3">
          <ChatComposer
            language={language}
            disabled={streaming}
            showSuggestions={messages.length <= 1}
            onSend={send}
          />
        </div>
      </div>
    </>
  );
}
