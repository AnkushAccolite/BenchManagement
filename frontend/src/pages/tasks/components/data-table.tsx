import * as React from 'react'
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
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { DataTablePagination } from '../components/data-table-pagination'
import { DataTableToolbar } from '../components/data-table-toolbar'
import { Button } from '@/components/custom/button'
import { Task } from '../data/schema'
import axios from 'axios'

const statusOptions = [
  { value: 'under_evaluation', label: 'Under Evaluation' },
  { value: 'interview_scheduled', label: 'Interview Scheduled' },
  { value: 'onboarding_in_progress', label: 'Onboarding in Progress' },
  { value: 'resigned', label: 'Resigned' },
  { value: 'onboarded', label: 'Onboarded' },
]

interface DataTableProps {
  columns: ColumnDef<Task>[]
  data: Task[]
  setData: React.Dispatch<React.SetStateAction<Task[]>>
}

export function DataTable({ columns, data, setData }: DataTableProps) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [editableRow, setEditableRow] = React.useState<Task | null>(null)
  const [tempData, setTempData] = React.useState<Task | null>(null)
  const [showActions, setShowActions] = React.useState<{
    [key: string]: boolean
  }>({})

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
  })

  const handleEdit = (row: Task) => {
    setEditableRow(row)
    setTempData(row)
    setShowActions((prev) => ({ ...prev, [row.empId]: true })) // Show actions on edit
  }

  const handleSave = () => {
    if (tempData && editableRow) {
      const updatedData = { ...tempData }
      // delete updatedData.skills // Remove skills from the object before sending it to the backend
      window.confirm('Are you sure you want to update the data?')
      setData((prevData) =>
        prevData.map((item) =>
          item.empId === editableRow.empId ? tempData : item
        )
      )
      // console.log('===', updatedData)
      axios
        .put(`http://localhost:8080/benched-employee/update`, updatedData)
        .then(() => {
          /* Optionally handle success */
        })
        .catch((error) => console.log(error))

      // Collapse action buttons after save
      collapseActions()
      setEditableRow(null)
      setTempData(null)
    }
  }

  const handleCancel = () => {
    if (editableRow) {
      // Collapse action buttons after cancel
      collapseActions()
    }
    setEditableRow(null)
    setTempData(null)
  }

  const handleChange = (key: keyof Task, value: any) => {
    if (tempData) {
      setTempData({ ...tempData, [key]: value })
    }
  }

  const handleDelete = (row: Task) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedRow = { ...row, isDeleted: !row.isDeleted }

      axios
        .put(
          `http://localhost:8080/benched-employee/update/${updatedRow.empId}`,
          updatedRow
        )
        .then(() => {
          setData((prevData) =>
            prevData.filter((item) => item.empId !== row.empId)
          )
          // Collapse action buttons after delete
          collapseActions()
        })
        .catch((error) => {
          console.error('Error deleting employee:', error)
        })
    }
  }
  // Function to collapse all actions after any operation
  const collapseActions = () => {
    setShowActions({})
  }

  const toggleActions = (rowId: string) => {
    setShowActions((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }))
  }

  return (
    <div className='space-y-4'>
      <DataTableToolbar table={table} />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                        cell.column.id === 'status' ? (
                          <select
                            value={tempData?.status || ''}
                            onChange={(e) =>
                              handleChange('status', e.target.value)
                            }
                            className='rounded-md border p-1 text-black'
                          >
                            {statusOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type='text'
                            value={
                              tempData ? (tempData as any)[cell.column.id] : ''
                            }
                            onChange={(e) =>
                              handleChange(
                                cell.column.id as keyof Task,
                                e.target.value
                              )
                            }
                            className='rounded-md border p-1 text-black'
                          />
                        )
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className='flex space-x-2'>
                      <Button
                        onClick={() => toggleActions(row.id)}
                        className='bg-gray-200 text-black hover:bg-gray-300'
                      >
                        ...
                      </Button>
                      {showActions[row.id] && (
                        <>
                          {editableRow === row.original ? (
                            <>
                              <Button onClick={handleSave}>Save</Button>
                              <Button onClick={handleCancel}>Cancel</Button>
                            </>
                          ) : (
                            <>
                              <Button onClick={() => handleEdit(row.original)}>
                                Edit
                              </Button>
                              <Button
                                onClick={() => handleDelete(row.original)}
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
