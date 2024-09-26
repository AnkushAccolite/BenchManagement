import { ColumnDef } from '@tanstack/react-table'
import { Task } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'empId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Emp Id' />
    ),
    enableColumnFilter: false,
  },
  {
    accessorKey: 'empName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Emp Name' />
    ),
  },
  {
    accessorKey: 'skills',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Skills' />
    ),
  },
  {
    accessorKey: 'experience',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Experience' />
    ),
  },
  {
    accessorKey: 'accoliteDOJ',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Accolite DOJ' />
    ),
  },
  {
    accessorKey: 'baseLocation',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Base Location' />
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
  },
  {
    accessorKey: 'clientName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Client Name' />
    ),
  },
  {
    accessorKey: 'ageing',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ageing' />
    ),
  },
  {
    accessorKey: 'benchDOJ',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Bench DOJ' />
    ),
  },
]
