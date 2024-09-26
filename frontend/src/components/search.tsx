import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface SearchProps {
  onSearch: (value: string) => void;
}

export function Search({ onSearch }: SearchProps) {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchValue(value)
    onSearch(value) // Pass search value to the DataTable
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
