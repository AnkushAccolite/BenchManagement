import React, { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { DataTablePagination } from '../components/data-table-pagination';
import { DataTableToolbar } from '../components/data-table-toolbar';
import { Button } from '@/components/custom/button';
import { DataTableColumnHeader } from '../components/data-table-column-header';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setData,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editableRow, setEditableRow] = useState<TData | null>(null);
  const [tempData, setTempData] = useState<TData | null>(null);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleEdit = (row: TData) => {
    setEditableRow(row);
    setTempData(row); // Store the current row data for editing
  };

  const handleSave = () => {
    if (tempData) {
      setData(prevData =>
        prevData.map(item => (item === editableRow ? tempData : item))
      );
      setEditableRow(null);
      setTempData(null);
    }
  };

  const handleCancel = () => {
    setEditableRow(null);
    setTempData(null);
  };

  const handleChange = (key: keyof TData, value: any) => {
    if (tempData) {
      setTempData({ ...tempData, [key]: value });
    }
  };

  const handleDelete = (row: TData) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setData(prevData => prevData.filter(item => item !== row));
      console.log('Deleted:', row);
    }
  };

  return (
    <div className='space-y-4'>
      <DataTableToolbar table={table}/>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    <DataTableColumnHeader
                      column={header.column}
                      title={
                        typeof header.column.columnDef.header === 'function'
                          ? header.column.columnDef.header(header.getContext())
                          : header.column.columnDef.header ?? 'Untitled'
                      }
                    />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => {
                    const isEditing = editableRow === row.original;
                    return (
                      <TableCell key={cell.id}>
                        {isEditing ? (
                          <input
                            type='text'
                            value={tempData ? (tempData as any)[cell.column.id] : ''}
                            onChange={e => handleChange(cell.column.id as keyof TData, e.target.value)}
                            className='border rounded-md p-1'
                          />
                        ) : (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <div className="flex space-x-2">
                      {editableRow === row.original ? (
                        <>
                          <Button onClick={handleSave}>Save</Button>
                          <Button onClick={handleCancel}>Cancel</Button>
                        </>
                      ) : (
                        <>
                          <Button onClick={() => handleEdit(row.original)}>Edit</Button>
                          <Button onClick={() => handleDelete(row.original)}>Delete</Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
