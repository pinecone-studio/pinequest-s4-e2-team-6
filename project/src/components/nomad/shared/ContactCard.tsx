import { MaterialIcon } from "../icons/MaterialIcon";

type ContactCardProps = {
  icon: string;
  title: string;
  meta: string;
};

export function ContactCard({ icon, title, meta }: ContactCardProps) {
  return (
    <div className="glass-panel flex items-center justify-between rounded-[24px] p-5 md:col-span-3">
      <div className="flex items-center gap-4">
        <span className="grid size-12 place-items-center rounded-full bg-black/5 dark:bg-white/10">
          <MaterialIcon name={icon} />
        </span>
        <div>
          <h3 className="font-black">{title}</h3>
          <p className="text-sm text-black/60 dark:text-white/60">{meta}</p>
        </div>
      </div>
      <MaterialIcon name="call" className="text-[#6f7880]" />
    </div>
  );
}
