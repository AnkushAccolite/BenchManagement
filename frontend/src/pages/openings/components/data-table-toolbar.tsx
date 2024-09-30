import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { Button } from '@/components/custom/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

interface ClientData {
  clientName: string;
  projectName: string;
}

interface DataTableToolbarProps<TData extends ClientData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData extends ClientData>({ table }: DataTableToolbarProps<TData>) {
  const navigate = useNavigate();
  const isFiltered = table.getState().columnFilters.length > 0;

  const clients = Array.from(new Set(table.getRowModel().rows.map(row => row.original.clientName)))
    .map(clientName => ({ label: clientName, value: clientName }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState('');

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClientChange = (clientValue: string) => {
    setSelectedClient(clientValue);
    table.getColumn('clientName')?.setFilterValue(clientValue);
    setDropdownOpen(false);
  };

  const handleReset = () => {
    table.resetColumnFilters();
    setSelectedClient('');
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filter projects...'
          value={(table.getColumn('projectName')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('projectName')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px] placeholder:text-muted-foreground'
        />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(prev => !prev)}
            className='h-8 w-[150px] rounded-md border bg-transparent text-sm font-small text-muted-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500 lg:w-[200px] text-left pl-2'
          >
            {selectedClient || 'Filter by Client...'}
          </button>
          {isDropdownOpen && (
            <div
              className='absolute z-10 w-full max-h-40 overflow-y-auto bg-white border rounded-md shadow-lg'
              style={{
                maxHeight: '160px',
              }}
            >
              {clients.map((client) => (
                <div
                  key={client.value}
                  className='p-2 hover:bg-gray-100 cursor-pointer text-black'
                  onClick={() => handleClientChange(client.value)}
                >
                  {client.label}
                </div>
              ))}
            </div>
          )}
        </div>


        {isFiltered && (
          <Button
            variant='ghost'
            onClick={handleReset}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} onAdd={() => navigate('/add-item')} />
    </div>
  );
}
