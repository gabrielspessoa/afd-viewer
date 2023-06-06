import { twMerge } from 'tailwind-merge';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Providers from '@/components/Providers';

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
  return (
    <html lang='pt' className='overflow-y-scroll'>
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
