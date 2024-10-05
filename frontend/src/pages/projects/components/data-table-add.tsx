import { Layout } from '@/components/custom/layout'
import axiosInstance from '@/lib/axios'
import { useState } from 'react'

// Sample data for project names and skills
const ClientNames = [
  'FedEx',
  'Flipkart',
  'Morgan Stanley',
  'Goldman Sachs',
  'Fidelity',
  'NASDAQ',
]

export default function AddProject() {
  const initialFormState = {
    clientName: '',
    projectName: '',
    projectHead: '',
    deptName: '',
    deptHead: '',
    location: '',
  }

  const [formData, setFormData] = useState(initialFormState)

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    await axiosInstance.post('/project', formData)
    alert('Project added successfully!')
    console.log('Submitted Data:', formData)
    setFormData(initialFormState)
  }

  return (
    <Layout>
      <Layout.Header sticky>
        <div className='ml-auto flex items-center space-x-4'></div>
      </Layout.Header>

      <Layout.Body>
        <div className='mt-1 rounded-md p-1 shadow-md'>
          <h2 className='mb-4 text-center text-xl font-semibold text-black dark:text-white'>
            Add New Project
          </h2>

          <form onSubmit={handleSubmit}>
            <table className='min-w-full border-collapse border border-gray-300 dark:border-gray-600'>
              <tbody>
                <tr>
                  <td className='border border-gray-300 px-4 py-2 font-semibold text-black dark:border-gray-600 dark:text-white'>
                    Client Name
                  </td>
                  <td className='border border-gray-300 px-4 py-2 dark:border-gray-600'>
                    <select
                      id='clientName'
                      name='clientName'
                      value={formData.clientName}
                      onChange={handleChange}
                      className='w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                      required
                    >
                      <option value=''>Select a Client</option>
                      {ClientNames.map((client, index) => (
                        <option key={index} value={client}>
                          {client}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className='border border-gray-300 px-4 py-2 font-semibold text-black dark:border-gray-600 dark:text-white'>
                    Project Name
                  </td>
                  <td className='border border-gray-300 px-4 py-2 dark:border-gray-600'>
                    <input
                      type='text'
                      id='projectName'
                      name='projectName'
                      value={formData.projectName}
                      onChange={handleChange}
                      className='w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                      placeholder='Enter Project Name'
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className='border border-gray-300 px-4 py-2 font-semibold text-black dark:border-gray-600 dark:text-white'>
                    Project Head
                  </td>
                  <td className='border border-gray-300 px-4 py-2 dark:border-gray-600'>
                    <input
                      type='text'
                      id='projectHead'
                      name='projectHead'
                      value={formData.projectHead}
                      onChange={handleChange}
                      className='w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                      placeholder='Enter Project Head'
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className='border border-gray-300 px-4 py-2 font-semibold text-black dark:border-gray-600 dark:text-white'>
                    Department Name
                  </td>
                  <td className='border border-gray-300 px-4 py-2 dark:border-gray-600'>
                    <input
                      type='text'
                      id='deptName'
                      name='deptName'
                      value={formData.deptName}
                      onChange={handleChange}
                      className='w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                      placeholder='Enter Department Name'
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className='border border-gray-300 px-4 py-2 font-semibold text-black dark:border-gray-600 dark:text-white'>
                    Department Head
                  </td>
                  <td className='border border-gray-300 px-4 py-2 dark:border-gray-600'>
                    <input
                      type='text'
                      id='deptHead'
                      name='deptHead'
                      value={formData.deptHead}
                      onChange={handleChange}
                      className='w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                      placeholder='Enter Department Head'
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className='border border-gray-300 px-4 py-2 font-semibold text-black dark:border-gray-600 dark:text-white'>
                    Location
                  </td>
                  <td className='border border-gray-300 px-4 py-2 dark:border-gray-600'>
                    <input
                      type='text'
                      id='location'
                      name='location'
                      value={formData.location}
                      onChange={handleChange}
                      className='w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                      placeholder='City, Country' // Placeholder added here
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Submit Button */}
            <div className='mt-4 flex justify-center'>
              <button
                type='submit'
                className='rounded-md bg-black px-4 py-2 text-white hover:bg-black focus:outline-none focus:ring focus:ring-black dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-500'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Layout.Body>
    </Layout>
  )
}
