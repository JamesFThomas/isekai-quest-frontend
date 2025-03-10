import { useEffect, useState } from 'react';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Form } from '@/app/formstable/page';

// import { mockForms } from '@/data/mockForms';

const columnHelper = createColumnHelper<Form>();

// TODO add edit icon and functionality
// TODO add delete icon and functionality
const columns = [
  columnHelper.accessor('Id', {
    header: () => 'ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('FirstName', {
    header: () => 'First Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('LastName', {
    header: () => 'Last Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Message', {
    header: () => 'Message',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Completed', {
    header: () => 'Completed',
    cell: (info) => (info.getValue().toString() === 'true' ? '✔️' : '❌'),
  }),
];

type FormTableProps = {
  formsData: Form[];
};

const AllFormsTable = ({ formsData }: FormTableProps) => {
  const [data, setData] = useState<Form[]>([]);

  useEffect(() => {
    if (data.length === 0) {
      setData(formsData);
    }
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h1>All Forms Table</h1>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllFormsTable;
