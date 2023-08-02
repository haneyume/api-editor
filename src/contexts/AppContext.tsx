import { useState, useMemo, ReactNode, createContext } from 'react';

import type { DNDTreeApiItem, ApiItem } from '../types';
import { defaultApiItems } from '../types';

export interface AppContextProps {
  initialized: boolean;
  setInitialized: React.Dispatch<React.SetStateAction<boolean>>;

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  statusMessage: string;
  setStatusMessage: React.Dispatch<React.SetStateAction<string>>;

  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;

  themes: Array<{ label: string; value: string }>;
  languages: Array<{ label: string; value: string }>;

  apiItems: DNDTreeApiItem[];
  setApiItems: React.Dispatch<React.SetStateAction<DNDTreeApiItem[]>>;

  selectedApiId: string;
  setSelectedApiId: React.Dispatch<React.SetStateAction<string>>;

  currentApiItem: DNDTreeApiItem | undefined;

  setSingleApiItem: (data: Partial<ApiItem>, text?: string) => void;
}

export const AppContext = createContext<AppContextProps>(undefined!);

export interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('Ready');
  const [userId, setUserId] = useState<string>('');

  const [apiItems, setApiItems] = useState<DNDTreeApiItem[]>(defaultApiItems());
  const [selectedApiId, setSelectedApiId] = useState<string>('');

  const currentApiItem = useMemo(() => {
    if (selectedApiId) {
      const selected = apiItems.find((item) => item.id === selectedApiId);

      return selected;
    }
  }, [selectedApiId]);

  const setSingleApiItem = (data: Partial<ApiItem>, text?: string) => {
    setApiItems((prev) => {
      const index = prev.findIndex((item) => item.id === selectedApiId);
      if (index === -1) {
        return prev;
      }

      const updated = [...prev];
      updated[index].data = { ...updated[index].data, ...data } as ApiItem;

      if (text) {
        updated[index].text = text;
      }

      return updated;
    });
  };

  return (
    <AppContext.Provider
      value={{
        initialized,
        setInitialized,

        loading,
        setLoading,

        statusMessage,
        setStatusMessage,

        userId,
        setUserId,

        themes: [
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
        ],

        languages: [
          { label: 'English', value: 'en' },
          { label: '日本語', value: 'ja' },
          { label: '繁體中文', value: 'zhHant' },
          { label: '简体中文', value: 'zhHans' },
        ],

        apiItems,
        setApiItems,

        selectedApiId,
        setSelectedApiId,

        currentApiItem,

        setSingleApiItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
