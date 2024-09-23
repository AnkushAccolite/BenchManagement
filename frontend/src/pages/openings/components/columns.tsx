import { ColumnDef } from '@tanstack/react-table';

//import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { Openings } from '../data/schema';

export const columns: ColumnDef<Openings>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'projectId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Project ID' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('projectId')}</div>,
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
    cell: ({ row }) => (
      <span>{row.getValue('clientName')}</span>
    ),
  },
  {
    accessorKey: 'requirements',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Requirements' />
    ),
    cell: ({ row }) => (
      <span>{row.getValue('requirements')}</span>
    ),
  },
  {
    accessorKey: 'projectHead',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Project Head' />
    ),
    cell: ({ row }) => (
      <span>{row.getValue('projectHead')}</span>
    ),
  },
  {
    accessorKey: 'department',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Department' />
    ),
    cell: ({ row }) => (
      <span>{row.getValue('department')}</span>
    ),
  },
  {
    accessorKey: 'departmentHead',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Department Head' />
    ),
    cell: ({ row }) => (
      <span>{row.getValue('departmentHead')}</span>
    ),
  },
  {
    accessorKey: 'deadline',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Deadline' />
    ),
    cell: ({ row }) => (
      <span>{row.getValue('deadline')}</span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
