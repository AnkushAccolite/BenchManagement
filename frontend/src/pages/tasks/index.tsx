import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useEffect, useState } from 'react'
import axiosInstance from '@/lib/axios'

export default function Tasks() {
  const [searchTerm, setSearchTerm] = useState('')

  const [tasks, setTasks] = useState([]) // Manage tasks state

  function transformSkills(data: any) {
    return data.map((employee) => {
      if (Array.isArray(employee.skills)) {
        const skillNames = employee.skills
          .map((skill) => skill.skillName)
          .join(', ')
        return {
          ...employee,
          skills: skillNames,
        }
      }
      return employee
    })
  }

  function transformStatus(status) {
    return status
      .toLowerCase()
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  useEffect(() => {
    const fetchBenchedEmployees = async () => {
      try {
        // Fetch benched employees
        const benchedEmployeesRes = await axiosInstance.get('/benched-employee')
        const benchedEmployees = benchedEmployeesRes.data

        const temp = transformSkills(benchedEmployees)
        setTasks(temp) // Assuming setTasks is used to update the state of the benched employees
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }

    fetchBenchedEmployees()
  }, [])

  const filteredData = tasks?.filter(
    (task) =>
      task.empId?.toString().includes(searchTerm || '') ||
      task.name?.toLowerCase().includes(searchTerm?.toLowerCase() || '')
  )

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
            <h2 className='text-2xl font-bold tracking-tight'>Bench Records</h2>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={filteredData} columns={columns} setData={setTasks} />
        </div>
      </Layout.Body>
    </Layout>
  )
}
