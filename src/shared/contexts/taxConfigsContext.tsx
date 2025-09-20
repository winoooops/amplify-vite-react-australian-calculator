import React, { createContext, useCallback, useContext, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../amplify/data/resource";
import type { TaxConfig, CreateTaxConfigWithBracketsInput } from "../types";
import createTaxConfigMutationHandler from "../middlewares/mutations/createTaxConfigMutationHandler";
import listTaxConfigQueryHandler from "../middlewares/queries/listTaxConfigQueryHandler";

type TaxConfigsContextType = {
  history: TaxConfig[];
  setHistory: (history: TaxConfig[]) => void;
  isHistoryLoading: boolean;
  isDeleting: boolean;
  historyError: string | null;
  fetchHistory: () => void;
  handleDeleteConfig: (configId: string) => void;
  activateConfig: (configId: string) => Promise<void>;
  createTaxConfigWithBrackets: (
    input: CreateTaxConfigWithBracketsInput
  ) => Promise<void>;
};

export const TaxConfigsContext = createContext<TaxConfigsContextType>({
  history: [],
  setHistory: () => {},
  isHistoryLoading: false,
  isDeleting: false,
  historyError: null,
  fetchHistory: () => {},
  handleDeleteConfig: () => {},
  activateConfig: async () => {},
  createTaxConfigWithBrackets: async () => {
    throw new Error("createTaxConfigWithBrackets is not initialized");
  },
});

const client = generateClient<Schema>();

export function TaxConfigsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [history, setHistory] = useState<TaxConfig[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      setHistoryError(null);
      setIsHistoryLoading(true);

      const data = await listTaxConfigQueryHandler(client);
      console.log(data);

      setHistory(data as TaxConfig);
    } catch (error: unknown) {
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
          deletePromises.push(
            client.models.TaxBracket.delete({ id: bracket.id })
          );
        }
      });

      await Promise.all(deletePromises);

      await client.models.TaxConfig.delete({ id: configId });

      await fetchHistory();
    } catch (error: unknown) {
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

  const activateConfig = async (configId: string) => {
    try {
      setHistoryError(null);

      // Optimistically update local state first
      setHistory((state) =>
        state.map((item) =>
          item.id === configId
            ? { ...item, isActive: true }
            : { ...item, isActive: false }
        )
      );

      const { data: configs, errors } = await client.models.TaxConfig.list();

      if (errors?.length) {
        throw new Error(errors.map((error) => error.message).join(", "));
      }

      const updates = (configs ?? []).map((config) => {
        if (!config?.id) {
          return Promise.resolve();
        }

        const nextIsActive = config.id === configId;
        if (config.isActive === nextIsActive) {
          return Promise.resolve();
        }

        return client.models.TaxConfig.update({
          id: config.id,
          isActive: nextIsActive,
        });
      });

      await Promise.all(updates);

      await fetchHistory();
    } catch (error: unknown) {
      console.error("Error activating config:", error);
      setHistoryError(
        error instanceof Error
          ? error.message
          : "Failed to activate configuration"
      );

      // Revert optimistic update on error
      await fetchHistory();
    }
  };

  const createTaxConfigWithBrackets = async (
    input: CreateTaxConfigWithBracketsInput
  ) => {
    const data = await createTaxConfigMutationHandler(client, input);
    console.log(data);
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
        activateConfig,
        createTaxConfigWithBrackets,
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
