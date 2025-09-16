import { useEffect } from "react";
import { Schema } from "../../../../amplify/data/resource";
import HistoryCard from "./HistoryCard";
import { useConfigHistory } from "../../../hooks/useConfigHistory";
import { History } from "lucide-react";
import SectionTitle from "../../SectionTitle";

export type TaxConfigHistoryItem = Schema["TaxConfig"]["type"] & {
  bracketCount: number;
};

function ConfigHistory() {
  const { history, isHistoryLoading, isDeleting, historyError, fetchHistory, handleDeleteConfig } = useConfigHistory();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  if (history.length === 0) { return null; }

  return (
    <section className="mt-13">
      <div className="p-9 rounded-2xl bg-gradient-to-r from-slate-50 to-white border-2 border-slate-200/50 hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <SectionTitle title="Configuration History">
            <History />
          </SectionTitle>
          <button
            type="button"
            onClick={fetchHistory}
            className="self-start px-5 py-2 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:from-slate-200 hover:to-slate-300 transition-all duration-300"
          >
            Refresh
          </button>
        </div>

        {historyError && (
          <div className="mt-7 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl">
            <p className="font-medium">{historyError}</p>
          </div>
        )}

        {isHistoryLoading ? (
          <div className="flex items-center justify-center py-13">
            <span className="text-sm font-medium text-slate-501 animate-pulse">
              Loading configuration history...
            </span>
          </div>
        ) : (
          <div className="mt-7 space-y-4">
            {history.map((config) => (
              <HistoryCard
                key={config.id}
                config={config}
                isDeleting={isDeleting}
                handleDeleteConfig={handleDeleteConfig}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ConfigHistory;