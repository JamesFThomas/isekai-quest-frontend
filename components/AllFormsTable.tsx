import { useCallback, useEffect, useState } from 'react';

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
        <EditIcon onClick={() => handleEdit(info.row.original.Id)} />
      ),
    }),
    columnHelper.display({
      id: 'delete',
      header: () => 'Delete',
      cell: (info) => (
        <DeleteIcon onClick={() => handleDelete(info.row.original.Id)} />
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleEdit = (id: number) => {
    // Implement edit functionality here
    console.log('Edit icon was clicked for Form with id#:', id);
  };

  const handleDelete = useCallback(async (id: number) => {
    await fetch(`https://localhost:5001/Forms/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': 'true', // Required for cookies, authorization headers with HTTPS
      },
    })
      .then((response) => response.text())
      .then((data) =>
        console.log(data + `Form with Id: ${id} has been deleted`),
      )
      .catch((error) => console.error('Fetch Error', error));
  }, []);

  useEffect(() => {
    if (data.length === 0) {
      setData(formsData);
    }
  }, [data, formsData, handleDelete]);

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
