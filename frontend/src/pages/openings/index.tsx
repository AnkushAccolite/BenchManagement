import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useEffect, useState } from 'react'
import axiosInstance from '@/lib/axios'

export default function Openings() {
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const { data: reqResponse } = await axiosInstance.get(
        '/project-requirement'
      )
      const { data: projResponse } = await axiosInstance.get('/project')
      const mergedData = reqResponse.map((req) => {
        const project = projResponse.find((proj) => proj.id === req.projectId)
        return {
          id: req.id,
          projectId: req.projectId,
          projectName: project ? project.projectName : 'Unknown Project',
          openings: req.openings,
          clientName: req.clientName,
          skills: req.skills,
          location: project ? project.location : 'Unknown Location',
        }
      })
      console.log('-->', mergedData)
      setData(mergedData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Openings</h2>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable
            data={data}
            columns={columns}
            setData={setData}
            fetch={fetchData}
          />
        </div>
      </Layout.Body>
    </Layout>
  )
}
