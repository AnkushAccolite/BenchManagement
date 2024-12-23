import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useEffect, useState } from 'react'
import axiosInstance from '@/lib/axios'

export default function Projects() {
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data: response } = await axiosInstance.get('/project')
      setData(response)
    }
    getData()
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
            <h2 className='text-2xl font-bold tracking-tight'>Open Projects</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of currently open projects!
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={data} columns={columns} setData={setData} />
        </div>
      </Layout.Body>
    </Layout>
  )
}
