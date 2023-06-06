'use client';

import { useRouter } from 'next/navigation';
import { FileContext } from '@/contexts/FileContext';
import { Bebas_Neue } from 'next/font/google';
import { useContext, useEffect } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: ['400'] });

export default function Home() {
  const router = useRouter();
  const { file, setFile } = useContext(FileContext);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: {
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
    onDropAccepted: (files) => {
      setFile(files[0]);
      router.push('/view');
    },
  });

  useEffect(() => {
    fileRejections.length > 0 && toast.error('Arquivo inválido');
  }, [fileRejections]);
  return (
    <div>
      <h1
        className={twMerge(bebasNeue.className, 'text-5xl text-center mt-32')}
      >
        AFD Viewer
      </h1>
      <div className='flex justify-center mt-5'>
        <div
          {...getRootProps({
            className: twMerge(
              'w-full flex flex-col gap-2 justify-center items-center group cursor-pointer max-w-lg border-2 border-dashed border-zinc-400 text-zinc-400 rounded-xl h-48 transition focus:outline-none',
              isFocused && 'border-indigo-600',
              isDragAccept && 'bg-emerald-800/10 border-emerald-600',
              isDragReject && 'bg-red-800/10 border-red-600'
            ),
          })}
        >
          <input {...getInputProps({ className: '' })} />
          <div>Arraste e solte o arquivo AFD ou</div>
          <div className='group-hover:underline underline-offset-2'>
            Escolha o arquivo
          </div>
        </div>
      </div>
    </div>
  );
}
