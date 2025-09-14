import { ReactNode } from "react";

function FooterSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="font-semibold mb-2 text-slate-900">
        <span>{title}</span>
      </h3>
      {children}
    </div>
  );
}

export default FooterSection;
