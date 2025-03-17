import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Form } from '@/app/formstable/page';
import { Card, CardHeader, Typography } from '@mui/material';

const columnHelper = createColumnHelper<Form>();

type FormTableProps = {
  formsData: Form[];
  refreshData: () => Promise<void>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<Form | undefined>>;
  setFormType: Dispatch<SetStateAction<number>>;
  setModalTitle: Dispatch<SetStateAction<string | undefined>>;
};

const AllFormsTable = ({
  formsData,
  refreshData,
  setIsModalOpen,
  setFormData,
  setFormType,
  setModalTitle,
}: FormTableProps) => {
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
      cell: (info) =>
        info.getValue().toString() === 'true' ? (
          <CheckIcon sx={{ color: '#4caf50' }} />
        ) : (
          <ClearIcon sx={{ color: '#f44336' }} />
        ),
    }),
    columnHelper.display({
      id: 'edit',
      header: () => 'Edit',
      cell: (info) => (
        <EditIcon
          sx={{ cursor: 'pointer' }}
          onClick={() => handleEdit(info.row.original)}
        />
      ),
    }),
    columnHelper.display({
      id: 'delete',
      header: () => 'Delete',
      cell: (info) => (
        <DeleteIcon
          sx={{ cursor: 'pointer' }}
          onClick={() => deleteThenRefresh(info.row.original.Id)}
        />
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleEdit = (rowData: Form) => {
    setIsModalOpen(true);
    setFormType(2);
    setModalTitle('Edit Form');
    setFormData(rowData);
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
        console.log(data + `Form with Id: ${id} has been deleted`)
      )
      .catch((error) => console.error('Fetch Error', error));
  }, []);

  const deleteThenRefresh = useCallback(
    async (id: number) => {
      await handleDelete(id);
      await refreshData();
    },
    [handleDelete, refreshData]
  );

  useEffect(() => {
    setData(formsData);
  }, [formsData]);

  return (
    <Card
      sx={{
        padding: 2,
        width: '800px',
      }}
    >
      <CardHeader
        sx={{
          textAlign: 'center',
        }}
        title={<Typography variant='h3'>All Forms Table</Typography>}
      />
      <table style={{ width: '100%' }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
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
    </Card>
  );
};

export default AllFormsTable;
