import { MaterialIcon } from "../icons/MaterialIcon";

type StatCardProps = {
  icon: string;
  value: string;
  label: string;
};

export function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="glass-panel rounded-[24px] p-5">
      <MaterialIcon name={icon} className="text-[#6f7880]" />
      <p className="mt-3 text-2xl font-black">{value}</p>
      <p className="mt-1 text-xs font-black uppercase tracking-[0] text-black/50 dark:text-white/50">{label}</p>
    </div>
  );
}
