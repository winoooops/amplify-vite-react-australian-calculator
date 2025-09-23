import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../amplify/data/resource";
import type { TaxConfig, CreateTaxConfigWithBracketsInput } from "../types";
import { batchDeleteHandler } from "../middlewares/mutations/batchDeleteHandler";
import {
  bracketPostHandler,
  bracketsPreHandler,
} from "../middlewares/mutations/bracketsCreationHandler";
import { bracketsQueryHandler } from "../middlewares/mutations/bracketsQueryHandler";

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
  ) => Promise<TaxConfig>;
  activeConfig: TaxConfig | null;
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
  activeConfig: null,
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
  const [activeConfig, setActiveConfig] = useState<TaxConfig | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      setHistoryError(null);
      setIsHistoryLoading(true);

      const { data, errors } = await client.models.TaxConfig.list({
        selectionSet: [
          "id",
          "version",
          "updatedAt",
          "lastUpdated",
          "isActive",
          "financialYearStart",
          "financialYearEnd",
          "createdAt",
          "brackets.*",
        ],
      });

      if (errors && errors.length > 0) {
        throw new Error(errors.map((err) => err.message).join(", "));
      }

      if (data && data.length === 0) {
        setHistory([]);
      }

      setHistory(data as TaxConfig[]);
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

      batchDeleteHandler(configId, brackets, client);

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

  const getActiveConfig = async () => {
    const { data, errors } = await client.models.TaxConfig.list({
      filter: {
        isActive: {
          eq: true,
        },
      },
      selectionSet: [
        "id",
        "updatedAt",
        "lastUpdated",
        "isActive",
        "version",
        "financialYearStart",
        "financialYearEnd",
        "createdAt",
        "brackets.*",
      ],
    });

    if (errors && errors.length > 0) {
      throw new Error(errors.map((err) => err.message).join(", "));
    }

    if (data && data.length === 0) {
      return null;
    }

    const brackets = await bracketsQueryHandler(client, data[0].id);

    setActiveConfig({ ...data[0], brackets } as TaxConfig);
  };

  const createTaxConfigWithBrackets = async (
    input: CreateTaxConfigWithBracketsInput
  ) => {
    const computedInput = bracketsPreHandler(input);

    const { data, errors } = await client.models.TaxConfig.create(
      computedInput,
      {
        selectionSet: [
          "id",
          "createdAt",
          "updatedAt",
          "lastUpdated",
          "version",
          "isActive",
          "financialYearEnd",
          "financialYearStart",
          "brackets.*",
        ],
      }
    );

    if (errors && errors.length > 0) {
      throw new Error(errors.map((error) => error.message).join(", "));
    }

    if (!data) {
      throw new Error("Failed to create tax config");
    }

    await bracketPostHandler(client, data.id, computedInput.brackets);

    return data as TaxConfig;
  };

  useEffect(() => {
    getActiveConfig();

    return () => setActiveConfig(null);
  }, []);

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
        activeConfig,
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
