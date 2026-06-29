"use client";

import { MaterialIcon } from "../icons/MaterialIcon";
import type { ChatMessage } from "@/lib/culture/types";
import { TypingDots } from "./TypingDots";

type Props = { message: ChatMessage; streaming?: boolean };

/** A single chat row — user (right) or advisor (left) with an avatar. */
export function ChatBubble({ message, streaming }: Props) {
  const isUser = message.role === "user";
  const empty = message.content.length === 0;

  if (isUser) {
    return (
      <div className="animate-fade-up flex justify-end">
        <div className="max-w-[82%] rounded-[22px] rounded-br-md bg-linear-to-br from-[#00658b] to-[#0a86b8] px-4 py-3 text-[15px] leading-7 text-white shadow-lg shadow-[#00658b]/25 dark:from-[#6bcbff] dark:to-[#e0a32e] dark:text-[#001e2d]">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-up flex items-end gap-2.5">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-linear-to-br from-[#6bcbff] via-[#00658b] to-[#e0a32e] text-white shadow-md">
        <MaterialIcon name="auto_awesome" className="size-[18px]" />
      </span>
      <div className="max-w-[82%] space-y-2">
        <div className="glass-panel whitespace-pre-wrap rounded-[22px] rounded-bl-md px-4 py-3 text-[15px] leading-7">
          {empty && !message.images?.length ? <TypingDots /> : message.content}
          {streaming && !empty && (
            <span className="ml-0.5 inline-block h-4 w-[2px] -translate-y-0.5 animate-pulse bg-[#00658b] align-middle dark:bg-[#7dd0ff]" />
          )}
        </div>
        {message.images && message.images.length > 0 && <ImageGallery images={message.images} />}
      </div>
    </div>
  );
}

function ImageGallery({ images }: { images: string[] }) {
  return (
    <div className={`grid gap-1.5 ${images.length > 1 ? "grid-cols-3" : "grid-cols-1"}`}>
      {images.map((src, i) => (
        <a
          key={src}
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className={`animate-fade-up group relative overflow-hidden rounded-2xl border border-white/20 delay-${Math.min(i + 1, 3)}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt="Холбогдох соёлын зураг"
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-24 w-full object-cover transition duration-500 group-hover:scale-110"
          />
        </a>
      ))}
    </div>
  );
}
