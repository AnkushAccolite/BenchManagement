import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
// import { tasks as initialTasks } from './data/tasks'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Tasks() {
  const [searchTerm, setSearchTerm] = useState('');

  const [tasks, setTasks] = useState([]); // Manage tasks state


function transformSkills(data:any) {
  // Iterate over each object in the data array
  return data.map(employee => {
    // Check if the employee has a skills array
    if (Array.isArray(employee.skills)) {
      // Extract skill names from the skills array and join them with a comma separator
      const skillNames = employee.skills.map(skill => skill.skillName).join(", ");
      
      // Replace the skills array with the concatenated skill names string
      return {
        ...employee,  // Spread the rest of the employee object
        skills: skillNames // Update the skills field with the concatenated string
      };
    }
    return employee; // Return employee unchanged if no skills array is present
  });
}

useEffect(() => {
  axios.get("http://localhost:8080/benched-employee")
    .then(res => {
      // Log the full response to verify it's an array
      console.log('Full response array:', res.data);

      const temp = transformSkills(res.data);
      setTasks(temp);
      
    })
    .catch(err => {
      console.error("Error fetching data:", err);
    });
}, []);


  const filteredData = tasks?.filter(task =>
    task.empId.toString().includes(searchTerm.toLowerCase()) ||
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
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
