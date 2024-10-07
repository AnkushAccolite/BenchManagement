import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '../components/data-table-view-options'

const statusOptions = [
  { value: 'under_evaluation', label: 'Under Evaluation' },
  { value: 'interview_scheduled', label: 'Interview Scheduled' },
  { value: 'onboarding_in_progress', label: 'Onboarding in Progress' },
  { value: 'resigned', label: 'Resigned' },
  { value: 'onboarded', label: 'Onboarded' },
]

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const handleFilterChange =
    (columnId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      table.getColumn(columnId)?.setFilterValue(event.target.value)
    }

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    table.getColumn('status')?.setFilterValue(event.target.value)
  }

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filter by Skills...'
          onChange={handleFilterChange('skills')}
          className='h-8 w-[150px] lg:w-[200px]'
        />
        <select
          onChange={handleStatusChange}
          className='h-8 w-[150px] rounded-md border bg-transparent text-sm font-small text-muted-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500 lg:w-[200px]'
          defaultValue=''
        >
          <option value='' disabled>
            Filter by Status...
          </option>
          {statusOptions.map((option) => (
            <option key={option.label} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>

        <Input
          placeholder='Filter by Opening Id...'
          onChange={handleFilterChange('client')}
          className='h-8 w-[150px] lg:w-[200px]'
        />

        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
