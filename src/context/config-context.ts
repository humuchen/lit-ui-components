import { createContext } from '@lit/context';

export interface ConfigState {
  theme: string;
  locale: string;
}

export const configContext = createContext<ConfigState>('config');
