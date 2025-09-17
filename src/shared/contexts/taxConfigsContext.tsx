import React, { createContext, useCallback, useContext, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../amplify/data/resource";
import { TaxConfig } from "../types";

type TaxConfigsContextType = {
  history: TaxConfig[];
  setHistory: (history: TaxConfig[]) => void;
  isHistoryLoading: boolean;
  isDeleting: boolean;
  historyError: string | null;
  fetchHistory: () => void;
  handleDeleteConfig: (configId: string) => void;
};

export const TaxConfigsContext = createContext<TaxConfigsContextType>({
  history: [],
  setHistory: () => { },
  isHistoryLoading: false,
  isDeleting: false,
  historyError: null,
  fetchHistory: () => { },
  handleDeleteConfig: () => { },
});

const client = generateClient<Schema>();

export function TaxConfigsProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<TaxConfig[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      setHistoryError(null);
      setIsHistoryLoading(true);

      // Fetch TaxConfigs with their related TaxBrackets in a single request
      const { data: configs, errors } = await client.models.TaxConfig.list({
        selectionSet: [
          "id",
          "financialYearStart",
          "financialYearEnd",
          "version",
          "lastUpdated",
          // include related brackets fields
          "brackets.id",
          "brackets.taxConfigId",
          "brackets.order",
          "brackets.lower",
          "brackets.upper",
          "brackets.rate",
          "brackets.styleRef",
          "brackets.label",
        ],
      });

      if (errors?.length) {
        throw new Error(errors.map((error) => error.message).join(", "));
      }
      setHistory((configs ?? []) as unknown as TaxConfig[]);
    } catch (error) {
      console.error("Error loading tax configuration history:", error);
      setHistoryError(
        error instanceof Error
          ? error.message
          : "Failed to load tax configuration history"
      );
    } finally {
      setIsHistoryLoading(false);
    }
  }, []);

  const handleDeleteConfig = async (configId: string) => {
    if (!configId) {
      return;
    }

    const confirmDelete = window.confirm(
      "Delete this tax configuration? This action can't be undone."
    );

    if (!confirmDelete) {
      return;
    }

    setIsDeleting(true);
    setHistoryError(null);

    try {
      const { data: brackets, errors } = await client.models.TaxBracket.list({
        filter: { taxConfigId: { eq: configId } },
      });

      if (errors?.length) {
        throw new Error(errors.map((error) => error.message).join(", "));
      }

      const deletePromises: Promise<unknown>[] = [];

      (brackets ?? []).forEach((bracket) => {
        if (bracket?.id) {
          deletePromises.push(client.models.TaxBracket.delete({ id: bracket.id }));
        }
      });

      await Promise.all(deletePromises);

      await client.models.TaxConfig.delete({ id: configId });

      await fetchHistory();
    } catch (error) {
      console.error("Error deleting tax configuration:", error);
      setHistoryError(
        error instanceof Error
          ? error.message
          : "Failed to delete tax configuration"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <TaxConfigsContext.Provider
      value={{
        history,
        setHistory,
        isHistoryLoading,
        isDeleting,
        historyError,
        fetchHistory,
        handleDeleteConfig,
      }}
    >
      {children}
    </TaxConfigsContext.Provider>
  );
}

export function useTaxConfigs() {
  const ctx = useContext(TaxConfigsContext);
  if (!ctx) {
    throw new Error("useTaxConfigs must be used within TaxConfigsProvider");
  }
  return ctx;
}


