import * as React from 'react';
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
import { Task } from '../data/schema';
import axios from 'axios';
import { error } from 'console';

interface DataTableProps {
  columns: ColumnDef<Task>[];
  data: Task[];
  setData: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function DataTable({
  columns,
  data,
  setData,
}: DataTableProps) {
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [editableRow, setEditableRow] = React.useState<Task | null>(null);
  const [tempData, setTempData] = React.useState<Task | null>(null);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleEdit = (row: Task) => {
    setEditableRow(row);
    setTempData(row);
  };

  const handleSave = () => {
    if (tempData && editableRow) {
       // Clone tempData to avoid direct mutation
     const updatedData = { ...tempData };
     delete updatedData.skills; // Remove skills from the object before sending it to the backend
     console.log(updatedData);
     window.confirm("Are you sure you want to update the data?")
      setData(prevData =>
        prevData.map(item => (item.empId === editableRow.empId ? tempData : item))
      );
      axios.put(`http://localhost:8080/benched-employee/update/${tempData.empId}`,updatedData).then(()=>{}).catch(error=>console.log(error));
     
      setEditableRow(null);
      setTempData(null);

    }
  };

  const handleCancel = () => {
    setEditableRow(null);
    setTempData(null);
  };

  const handleChange = (key: keyof Task, value: any) => {
    if (tempData) {
      setTempData({ ...tempData, [key]: value });
    }
  };

 

  const handleDelete = (row: Task) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      console.log(row);
      const updatedRow = { ...row, isDeleted: !row.isDeleted };
  
      axios.put(`http://localhost:8080/benched-employee/update/${updatedRow.empId}`, updatedRow)
        .then(() => {
          // Only update local data after successful backend update
          setData(prevData => prevData.filter(item => item.empId !== row.empId));
          console.log("Deleted:", updatedRow);
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
        });
        row.isDeleted=updatedRow.isDeleted;
      // Log the deleted row
      console.log('Deleted:', row);
    }
  };
  

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {editableRow === row.original ? (
                        <input
                          type="text"
                          value={tempData && !tempData.isDeleted  ? (tempData as any)[cell.column.id] : ''}
                          onChange={e => handleChange(cell.column.id as keyof Task, e.target.value)}
                          className="border rounded-md p-1 text-black"
                        />
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </TableCell>
                  ))}
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
                <TableCell colSpan={columns.length} className="h-24 text-center">
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
