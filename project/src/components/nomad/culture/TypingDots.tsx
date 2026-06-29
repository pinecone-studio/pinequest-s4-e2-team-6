/** Three bouncing dots shown while the advisor is composing a reply. */
export function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label="typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="typing-dot size-2 rounded-full bg-[#00658b] dark:bg-[#7dd0ff]"
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </span>
  );
}
