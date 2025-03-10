import { useEffect, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Form } from '@/app/formstable/page';

// import { mockForms } from '@/data/mockForms';

const columnHelper = createColumnHelper<Form>();

// TODO add edit icon and functionality in display column
// TODO add delete icon and functionality in display column

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
    columnHelper.display({
      id: 'edit',
      header: () => 'Edit',
      cell: (info) => (
        <EditIcon onClick={() => handleEdit(info.row.original)} />
      ),
    }),
    columnHelper.display({
      id: 'delete',
      header: () => 'Delete',
      cell: (info) => (
        <DeleteIcon onClick={() => handleDelete(info.row.original)} />
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleEdit = (form: Form) => {
    // Implement edit functionality here
    console.log('Edit', form);
  };

  const handleDelete = (form: Form) => {
    // Implement delete functionality here
    console.log('Delete', form);
  };

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
