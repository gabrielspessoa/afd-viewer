'use client';

import { FileContext } from '@/contexts/FileContext';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [file, setFile] = useState<File | null>(null);

  return (
    <FileContext.Provider value={{ file, setFile }}>
      {children}
    </FileContext.Provider>
  );
}
