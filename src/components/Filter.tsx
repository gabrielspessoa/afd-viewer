import { Column, Table } from '@tanstack/react-table';
import Input from './Input';
import { MagnifyingGlass } from '@phosphor-icons/react';

const Filter = ({
  column,
  table,
}: {
  column: Column<any, any>;
  table: Table<any>;
}) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();
  return (
    <Input
      icon={MagnifyingGlass}
      value={(columnFilterValue ?? '') as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
    />
  );
};

export default Filter;
