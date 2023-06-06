'use client';

import { twMerge } from 'tailwind-merge';
import { Inter } from 'next/font/google';
import './globals.css';
import { createContext, useState } from 'react';
import { FileContext } from '@/contexts/FileContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AFD Viewer',
  description: 'Visualizador de Arquivos AFD',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [file, setFile] = useState<File | null>(null);
  return (
    <html lang='pt'>
      <body
        className={twMerge(
          inter.className,
          'bg-zinc-900 text-zinc-100 text-sm'
        )}
      >
        <Toaster
          toastOptions={{
            className: '!bg-zinc-700 !text-zinc-100',
          }}
        />
        <FileContext.Provider value={{ file, setFile }}>
          {children}
        </FileContext.Provider>
      </body>
    </html>
  );
}
