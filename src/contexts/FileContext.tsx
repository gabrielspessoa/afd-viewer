'use client';

import { createContext } from 'react';

export const FileContext = createContext<{
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}>({ file: null, setFile: () => {} });
