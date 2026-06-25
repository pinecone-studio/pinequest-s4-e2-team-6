import { MaterialIcon } from "../icons/MaterialIcon";

type CultureListProps = {
  title: string;
  icon: string;
  items: string[];
};

export function CultureList({ title, icon, items }: CultureListProps) {
  return (
    <div className="rounded-[20px] bg-white/35 p-5 dark:bg-white/8">
      <h3 className="mb-3 flex items-center gap-2 font-black">
        <MaterialIcon name={icon} className="text-[#00658b] dark:text-[#7dd0ff]" />
        {title}
      </h3>
      <ul className="space-y-2 text-black/65 dark:text-white/65">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
