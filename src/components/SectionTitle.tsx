import { ReactNode } from "react";

function SectionTitle({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 mb-8">
      {children}
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    </div>
  );
}

export default SectionTitle;
