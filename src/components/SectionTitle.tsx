import { ReactNode } from "react";

type Props = Readonly<{
  title: string;
  children: ReactNode;
}>;

function SectionTitle({
  title,
  children,
}: Props) {
  return (
    <div className="flex items-center gap-3 mb-8">
      {children}
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    </div>
  );
}

export default SectionTitle;
