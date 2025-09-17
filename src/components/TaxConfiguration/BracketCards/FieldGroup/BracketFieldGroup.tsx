import { ReactNode } from "react";

type Props = Readonly<{
  children: ReactNode;
  label: string;
  fieldName: string;
}>;

function BracketFieldGroup({ label, fieldName, children }: Props) {
  return (
    <div className="space-y-3">
      <label htmlFor={fieldName} className="block text-sm font-semibold text-slate-700 h-12">
        {label}
      </label>
      {children}
    </div>
  );
}

export default BracketFieldGroup;