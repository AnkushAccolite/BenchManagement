import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import { Projects } from '../data/schema'

export const columns: ColumnDef<Projects>[] = [
  {
    accessorKey: 'projectId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Project ID' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>{row.getValue('projectId')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'projectName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Project Name' />
    ),
    cell: ({ row }) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('projectName')}
      </span>
    ),
  },
  {
    accessorKey: 'clientName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Client Name' />
    ),
    cell: ({ row }) => <span>{row.getValue('clientName')}</span>,
  },
  {
    accessorKey: 'projectHead',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Project Head' />
    ),
    cell: ({ row }) => <span>{row.getValue('projectHead')}</span>,
  },
  {
    accessorKey: 'deptName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Department' />
    ),
    cell: ({ row }) => <span>{row.getValue('deptName')}</span>,
  },
  {
    accessorKey: 'deptHead',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Department Head' />
    ),
    cell: ({ row }) => <span>{row.getValue('deptHead')}</span>,
  },
  {
    accessorKey: 'location',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Location' />
    ),
    cell: ({ row }) => <span>{row.getValue('location')}</span>,
  },
]
