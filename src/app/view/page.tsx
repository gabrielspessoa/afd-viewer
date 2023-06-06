'use client';

import { FileContext } from '@/contexts/FileContext';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Table } from '@/components/Table';
import { createColumnHelper } from '@tanstack/react-table';
import parse from 'date-fns/parse';
import { format } from 'date-fns';
import { Ubuntu } from 'next/font/google';

interface Record {
  nsr: string;
  date: Date;
  pis: string;
}

const ubuntu = Ubuntu({ weight: ['400', '500'], subsets: ['latin'] });

export default function ViewPage() {
  const { file, setFile } = useContext(FileContext);
  const router = useRouter();
  const [businessInfo, setBusinessInfo] = useState({ cnpj: '', name: '' });
  const [allRecords, setAllRecords] = useState<Record[]>([]);

  // Lê o arquivo AFD
  const readFile = async (file: File) => {
    return file.text();
  };

  // Verifica o tipo de registro e chama as funções respectivas
  const parseRecords = useCallback((fileContents: string) => {
    const records: any[] = [];
    const lines = fileContents.split('\r\n');

    lines.map((line) => {
      // Se o tipo for 1, define as informações da empresa no state
      if (line.substring(9, 10) === '1') {
        const parsedLine = parseType1(line);
        setBusinessInfo(parsedLine);
      }

      // Se o tipo for 3, adiciona as informações do registro no array
      if (line.substring(9, 10) === '3') {
        const parsedLine = parseType3(line);
        if (parsedLine) {
          records.push(parsedLine);
        }
      }
    });
    setAllRecords(records);
  }, []);

  const parseType1 = (record: string) => {
    const parsedRecord = {
      cnpj: record.substring(11, 25),
      name: record.substring(37, 187).replace(/\s+$/, ''),
    };
    return parsedRecord;
  };

  const parseType3 = (record: string) => {
    const rawDate = record.substring(10, 22);

    const parsedRecord = {
      nsr: record.substring(0, 9),
      date: parse(rawDate, 'ddMMyyyyHHmm', new Date()),
      pis: record.substring(22, 34),
    };

    // Se o NSR não for numérico, o registro não será retornado
    if (!Number.isNaN(parseInt(parsedRecord.nsr))) {
      return parsedRecord;
    }
  };

  function formatCNPJ(cnpj: string) {
    cnpj = cnpj.replace(/[d]/g, '');
    return cnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5'
    );
  }

  const columnHelper = createColumnHelper<Record>();

  const defaultColumns = [
    columnHelper.accessor('nsr', { header: 'NSR' }),
    columnHelper.accessor('date', {
      header: 'Data',
      cell: ({ getValue }) => {
        return format(getValue(), 'dd/MM/yyyy - HH:mm');
      },
    }),
    columnHelper.accessor('pis', { header: 'PIS' }),
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (file) {
        try {
          const fileContents = await readFile(file);
          const parsedRecords = parseRecords(fileContents);
        } catch (err) {
          router.push('/');
        }
      } else {
        toast.error('Nenhum arquivo AFD enviado');

        router.push('/');
      }
    };
    fetchData();
  }, [file, router, parseRecords]);

  return (
    <div className='flex flex-col w-full max-w-2xl p-4 mx-auto'>
      <div
        className={
          'flex flex-col items-center mb-3 text-lg mt-11 border border-zinc-200 border-dashed rounded-md py-3 ' +
          ubuntu.className
        }
      >
        <p>
          CNPJ: <strong>{formatCNPJ(businessInfo.cnpj)}</strong>
        </p>
        <p>
          Nome: <strong>{businessInfo.name}</strong>
        </p>
      </div>
      <div className=''>
        <Table columns={defaultColumns} data={allRecords} />
      </div>
    </div>
  );
}
