"use client";

import { useState } from "react";
import { MaterialIcon } from "../icons/MaterialIcon";
import { plannerCopy } from "./plannerCopy";
import type { Language } from "../types";

type Props = { language: Language; loading: boolean; onGenerate: (text: string) => void };

/** Free-text request box with example chips. */
export function PlannerInput({ language, loading, onGenerate }: Props) {
  const t = plannerCopy[language];
  const [value, setValue] = useState("");

  const submit = () => {
    if (!value.trim() || loading) return;
    onGenerate(value);
  };

  return (
    <div className="glass-panel rounded-[28px] p-5">
      <div className="flex items-end gap-2">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          rows={2}
          placeholder={t.placeholder}
          className="min-h-12 flex-1 resize-none bg-transparent text-base outline-none placeholder:text-black/40 dark:placeholder:text-white/40"
        />
        <button
          type="button"
          onClick={submit}
          disabled={!value.trim() || loading}
          aria-label={t.generate}
          className="grid size-12 shrink-0 place-items-center rounded-full bg-linear-to-br from-[#00658b] to-[#0a86b8] text-white shadow-lg transition hover:scale-105 disabled:opacity-40 dark:from-[#6bcbff] dark:to-[#e0a32e] dark:text-[#001e2d]"
        >
          {loading ? (
            <span className="size-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          ) : (
            <MaterialIcon name="auto_awesome" className="size-5" />
          )}
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {t.examples.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => setValue(ex)}
            className="rounded-full border border-black/10 bg-white/40 px-3 py-1.5 text-xs font-bold tracking-tight transition hover:scale-[1.03] dark:border-white/10 dark:bg-white/5"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}
