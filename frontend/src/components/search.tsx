import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useLocation } from 'react-router-dom' // Import useLocation

interface SearchProps {
  onSearch: (value: string) => void;
}

export function Search({ onSearch }: SearchProps) {
  const [searchValue, setSearchValue] = useState('')

  const location = useLocation() // Get current location
  const isTasksPage = location.pathname === '/tasks' // Check if the path is /tasks

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchValue(value)
    onSearch(value) // Pass search value to the DataTable
  }

  if (!isTasksPage) {
    return null // Don't render anything if not on the tasks page
  }

  return (
    <div>
      <Input
        type='search'
        placeholder='Search by Emp Id or Emp Name...'
        value={searchValue}
        onChange={handleSearch}
        className='md:w-[100px] lg:w-[300px]'
      />
    </div>
  )
}
