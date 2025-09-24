export type MetricProps = {
  name: string;
  value: string;
  ui: {
    bgColor: "blue" | "red" | "green" | "slate";
  };
  children?: React.ReactNode;
};

function MetricCard({ name, value, ui: { bgColor }, children }: MetricProps) {
  const colorClasses = {
    blue: {
      container: "from-blue-50 to-blue-100 border-blue-200/50",
      iconBg: "from-blue-500 to-blue-600",
    },
    green: {
      container: "from-green-50 to-green-100 border-green-200/50",
      iconBg: "from-green-500 to-green-600",
    },
    red: {
      container: "from-red-50 to-red-100 border-red-200/50",
      iconBg: "from-red-500 to-red-600",
    },
    slate: {
      container: "from-slate-50 to-slate-100 border-slate-200/50",
      iconBg: "from-slate-500 to-slate-600",
    },
  };

  const color = colorClasses[bgColor];

  return (
    <div
      className={`p-6 rounded-2xl bg-gradient-to-r ${color.container} border hover:shadow-lg transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 bg-gradient-to-r ${color.iconBg} rounded-xl shadow-sm`}
          >
            {children}
          </div>

          <h3 className="font-semibold text-slate-700">
            <span>{name}</span>
          </h3>
        </div>
        <div className="text-2xl font-bold text-slate-900">
          <span>{value}</span>
        </div>
      </div>
    </div>
  );
}

export default MetricCard;
