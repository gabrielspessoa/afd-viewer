import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
  MagnifyingGlass,
} from '@phosphor-icons/react';
import Button from './Button';
import Input from './Input';
import Filter from './Filter';
import { useState } from 'react';

export const Table = ({ columns, data }: { columns: any; data: any }) => {
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <>
      <div className='flex items-center mb-3'>
        <Button
          variant='icon'
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <CaretDoubleLeft />
        </Button>
        <Button
          variant='icon'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <CaretLeft />
        </Button>
        <Button
          variant='icon'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <CaretRight />
        </Button>
        <Button
          variant='icon'
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <CaretDoubleRight />
        </Button>
        <span className='ml-2'>
          Página {table.getState().pagination.pageIndex + 1} de{' '}
          {table.getPageCount()}
        </span>
        <span className='flex items-center gap-2 ml-auto whitespace-nowrap'>
          Ir para a página
          <Input
            type='number'
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
        </span>
      </div>
      <div className='mb-3'>
        <Input
          value={globalFilter ?? ''}
          onChange={(e) => {
            setGlobalFilter(String(e.target.value));
          }}
          icon={MagnifyingGlass}
          className='w-fit'
          placeholder='Pesquisar'
        />
      </div>
      <div className='relative max-w-full overflow-x-auto rounded-lg shadow-md'>
        <table className='w-full text-left'>
          <thead className='bg-zinc-700'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className='p-4'>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className='bg-zinc-800'>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className='px-6 py-4'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
