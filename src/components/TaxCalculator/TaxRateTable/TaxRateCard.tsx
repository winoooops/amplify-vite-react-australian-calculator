import { COLOR_REF_ENUM, colorRefMap } from "../../../shared/types";

type Props = Readonly<{
  lower: number;
  upper: number | null;
  taxRate: number;
  maxTaxAmount: number;
  colorRef: COLOR_REF_ENUM;
}>;

function TaxRateCard({ lower, upper, taxRate, maxTaxAmount, colorRef }: Props) {
  const incomeRange = upper ? `$${lower} - $${upper}` : `$${lower}+`;

  const colorClasses = {
    gray: {
      baseColor: "bg-gray-500",
      onHover: "hover:border-gray-500",
    },
    green: {
      baseColor: "bg-green-500",
      onHover: "hover:border-green-500",
    },
    blue: {
      baseColor: "bg-blue-500",
      onHover: "hover:border-blue-500",
    },
    orange: {
      baseColor: "bg-orange-500",
      onHover: "hover:border-orange-500",
    },
    red: {
      baseColor: "bg-red-500",
      onHover: "hover:border-red-500",
    },
    purple: {
      baseColor: "bg-purple-500",
      onHover: "border-b-2 hover:border-purple-500",
    },
  };

  const getColorClasses = (colorRef: COLOR_REF_ENUM) => {
    const colorKey = colorRefMap[colorRef];
    return colorClasses[colorKey];
  };

  const maxTaxMessage =
    maxTaxAmount === 0 ? "No tax payable" : `Max Tax: ${maxTaxAmount}`;

  const color = getColorClasses(colorRef);

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-50 to-white border border-slate-200/50 hover:border-slate-300/50 transition-all duration-300 hover:shadow-lg">
      <div
        className={`p-6 border-b-4 border-transparent ${color.onHover} translation-colors duration-300`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${color.baseColor} shadow-sm`}
            ></div>
            <h3 className="font-bold text-slate-900 text-lg">
              <span>{incomeRange}</span>
            </h3>
          </div>
          <div
            className={`w-[100px] px-6 py-3 rounded-2xl bg-gradient-to-r ${color.baseColor} text-white font-bold text-lg shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl min-w-fit flex items-center justify-center hover:scale-120`}
          >
            <span>{taxRate}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-medium text-slate-500 bg-slate-50/50 px-3 py-2 rounded-lg">
          <span>{maxTaxMessage}</span>
        </div>
      </div>
    </div>
  );
}

export default TaxRateCard;
