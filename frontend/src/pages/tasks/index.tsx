import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { tasks as initialTasks } from './data/tasks'
import { useState } from 'react'

export default function Tasks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState(initialTasks); // Manage tasks state

  const filteredData = tasks.filter(task =>
    task.empId.toString().includes(searchTerm.toLowerCase()) ||
    task.empName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Layout.Header sticky>
        <Search onSearch={setSearchTerm} />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={filteredData} columns={columns} setData={setTasks} />
        </div>
      </Layout.Body>
    </Layout>
  )
}
