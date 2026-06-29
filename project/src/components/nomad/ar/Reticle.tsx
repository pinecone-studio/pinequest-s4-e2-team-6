/** Centre targeting reticle. Snaps + glows green when a marker locks on. */
export function Reticle({ locked }: { locked: boolean }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
      <div
        className={`relative grid place-items-center transition-all duration-300 ${
          locked ? "size-24" : "size-16"
        }`}
      >
        <div
          className={`absolute inset-0 rounded-full border transition-all duration-300 ${
            locked
              ? "border-[#34e0a1] shadow-[0_0_28px_rgba(52,224,161,0.7)]"
              : "border-white/40"
          }`}
        />
        {/* four ticks */}
        {["top-0 left-1/2 -translate-x-1/2 h-3 w-px", "bottom-0 left-1/2 -translate-x-1/2 h-3 w-px", "left-0 top-1/2 -translate-y-1/2 w-3 h-px", "right-0 top-1/2 -translate-y-1/2 w-3 h-px"].map(
          (cls) => (
            <span key={cls} className={`absolute ${cls} ${locked ? "bg-[#34e0a1]" : "bg-white/70"}`} />
          ),
        )}
        <span
          className={`size-1.5 rounded-full transition-colors ${
            locked ? "bg-[#34e0a1]" : "bg-white/80"
          }`}
        />
      </div>
    </div>
  );
}
