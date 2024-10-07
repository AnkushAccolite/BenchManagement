import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useEffect, useState } from 'react'
import axios from 'axios'
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

        // Fetch project requirement summary
        const projectRequirementRes = await axiosInstance.get(
          '/project-requirement/summary'
        )
        const projectRequirements = projectRequirementRes.data

        // Log full responses for debugging purposes
        // console.log('Benched Employees:', benchedEmployees)
        // console.log('Project Requirements:', projectRequirements)

        // Transform the benched employees data to update status and client based on project requirements
        const updatedBenchedEmployees = benchedEmployees.map((employee) => {
          let updatedStatus = employee.status
          let updatedClient = employee.client

          // Loop through each project requirement and check if the employee id is in interviewScheduled or selectedEmployees
          projectRequirements.forEach((req) => {
            if (
              req.interviewScheduled.includes(employee.id) &&
              employee.status === 'UNDER_EVALUATION'
            ) {
              updatedStatus = 'INTERVIEW_SCHEDULED'
              updatedClient = req.id
            } else if (
              req.selectedEmployees.includes(employee.id) &&
              employee.status === 'UNDER_EVALUATION'
            ) {
              updatedStatus =
                employee.status !== 'ONBOARDED'
                  ? 'ONBOARDING_IN_PROGRESS'
                  : 'ONBOARDED'
              updatedClient = req.id
            }
          })

          // Return the employee object with updated status and client
          return {
            ...employee,
            status: transformStatus(updatedStatus),
            client: updatedClient,
          }
        })

        // Update the state with the transformed benched employees data
        // console.log('Updated Benched Employees:', updatedBenchedEmployees)
        const temp = transformSkills(updatedBenchedEmployees)
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
