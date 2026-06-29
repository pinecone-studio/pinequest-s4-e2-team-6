"use client";

import { useState } from "react";
import { MaterialIcon } from "../icons/MaterialIcon";
import { cultureCopy } from "./cultureCopy";
import type { Language } from "../types";

type Props = {
  language: Language;
  disabled: boolean;
  showSuggestions: boolean;
  onSend: (text: string) => void;
};

/** Suggestion chips + the text input row for the culture chat. */
export function ChatComposer({ language, disabled, showSuggestions, onSend }: Props) {
  const t = cultureCopy[language];
  const [value, setValue] = useState("");

  const submit = () => {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
  };

  return (
    <div className="space-y-3">
      {showSuggestions && (
        <div className="flex flex-wrap gap-2">
          {t.suggestions.map((s, i) => (
            <button
              key={s}
              type="button"
              disabled={disabled}
              onClick={() => onSend(s)}
              className={`animate-fade-up glass-panel rounded-full px-3.5 py-2 text-left text-xs font-semibold tracking-tight transition hover:scale-[1.03] disabled:opacity-50 delay-${Math.min(i + 1, 3)}`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="glass-panel flex items-center gap-2 rounded-full p-1.5 pl-5">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder={t.placeholder}
          aria-label={t.placeholder}
          className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-black/40 dark:placeholder:text-white/40"
        />
        <button
          type="button"
          onClick={submit}
          disabled={disabled || !value.trim()}
          aria-label={t.send}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-linear-to-br from-[#00658b] to-[#0a86b8] text-white shadow-lg shadow-[#00658b]/30 transition hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 dark:from-[#6bcbff] dark:to-[#e0a32e] dark:text-[#001e2d]"
        >
          <MaterialIcon name="arrow_forward" className="size-5" />
        </button>
      </div>
    </div>
  );
}
