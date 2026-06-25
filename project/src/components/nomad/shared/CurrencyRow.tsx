type CurrencyRowProps = {
  label: string;
  value: string;
  suffix: string;
  highlight?: boolean;
};

export function CurrencyRow({ label, value, suffix, highlight = false }: CurrencyRowProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/35 bg-white/45 p-4 dark:bg-white/8">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0] text-black/45 dark:text-white/45">{label}</p>
        <p className={`text-xl font-black ${highlight ? "text-[#00658b] dark:text-[#7dd0ff]" : ""}`}>{value}</p>
      </div>
      <span className="text-black/50 dark:text-white/50">{suffix}</span>
    </div>
  );
}
