import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import axiosInstance from '@/lib/axios'
import { useEffect, useState } from 'react'

const skillOptions = [
  'JavaScript',
  'Python',
  'Java',
  'React',
  'Spring Boot',
  'Angular',
  'CI/CD',
  'C++',
  'Hibernate',
  'MySQL',
  'MongoDB',
]

export default function AddProject() {
  const initialFormState = {
    clientName: '',
    projectId: '',
    skills: '',
    openings: '',
    experience: '',  // New field
    deadline: '',    // New field
  }

  const [formData, setFormData] = useState(initialFormState)
  const [projectNames, setProjectNames] = useState([])
  const [clientNames, setClientNames] = useState([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosInstance.get('/project')
      const projects = data.map((project) => ({
        id: project.id,
        name: project.projectName,
        clientName: project.clientName,
      }))
      const clients = data.map((project) => project.clientName)

      setProjectNames(projects)
      setClientNames(clients)
    }
    getData()
  }, [])

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSkillChange = (e: { target: { value: string } }) => {
    const skill = e.target.value

    if (selectedSkills.includes(skill)) {
      setSelectedSkills((prevSkills) => prevSkills.filter((s) => s !== skill))
    } else {
      setSelectedSkills((prevSkills) => [...prevSkills, skill])
    }
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault()
      let payload = formData
      payload.skills = selectedSkills.join(', ')
      delete payload.projectName
      await axiosInstance.post('/project-requirement', payload)
      alert('Opening added successfully!')
    } catch (error) {
      console.log(error)
    } finally {
      setFormData(initialFormState)
      setSelectedSkills([])
    }
  }

  const removeSkill = (skill: string) => {
    setSelectedSkills((prevSkills) => prevSkills.filter((s) => s !== skill))
  }

  return (
    <Layout>
      <Layout.Header sticky>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mt-8 rounded-md p-8 shadow-md'>
          <h2 className='mb-8 text-center text-xl font-semibold text-black dark:text-white'>
            Add New Opening
          </h2>

          <form onSubmit={handleSubmit}>
            <table className='min-w-full table-fixed border-collapse border border-gray-300 dark:border-gray-600'>
              <tbody>
                {/* Client Name */}
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
                      className='w-full  rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                      required
                    >
                      <option value=''>Select a Client</option>
                      {clientNames.map((client, index) => (
                        <option key={index} value={client}>
                          {client}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>

                {/* Project Name */}
                <tr>
                  <td className='border border-gray-300 px-4 py-2 font-semibold text-black dark:border-gray-600 dark:text-white'>
                    Project Name
                  </td>
                  <td className='border border-gray-300 px-4 py-2 dark:border-gray-600'>
                    <select
                      id='projectId'
                      name='projectId'
                      value={formData.projectId}
                      onChange={handleChange}
                      className='w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                      required
                    >
                      <option value=''>Select a project</option>
                      {projectNames
                        .filter(
                          (proj) => proj.clientName === formData.clientName
                        )
                        .map((project, index) => (
                          <option key={index} value={project.id}>
                            {project.name}
                          </option>
                        ))}
                    </select>
                  </td>
                </tr>

                {/* Skills */}
                <tr>
                  <td className='border border-gray-300 px-4 py-2 font-semibold text-black dark:border-gray-600 dark:text-white'>
                    Skills
                  </td>
                  <td className='border border-gray-300 px-4 py-2 dark:border-gray-600'>
                    <select
                      id='skills'
                      name='skills'
                      value=''
                      onChange={handleSkillChange}
                      className='w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                    >
                      <option value=''>Select a skill</option>
                      {skillOptions.map((skill, index) => (
                        <option key={index} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </select>
                    <div className='mt-2'>
                      <div className='mt-1 flex flex-wrap gap-2'>
                        {selectedSkills.length > 0 &&
                          selectedSkills.map((skill) => (
                            <div
                              key={skill}
                              className='mb-1 flex items-center rounded bg-gray-200 px-2 py-1 text-black dark:bg-gray-700 dark:text-white'
                            >
                              <span>{skill}</span>
                              <button
                                type='button'
                                onClick={() => removeSkill(skill)}
                                className='ml-2 text-red-500'
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Openings */}
                <tr>
                  <td className='border border-gray-300 px-4 py-2 font-semibold text-black dark:border-gray-600 dark:text-white'>
                    Openings
                  </td>
                  <td className='border border-gray-300 px-4 py-2 dark:border-gray-600'>
                    <input
                      type='number'
                      id='openings'
                      name='openings'
                      value={formData.openings}
                      onChange={handleChange}
                      className='w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                      placeholder='Enter number of openings'
                    />
                  </td>
                </tr>

                {/* Experience */}
                <tr>
                  <td className='border border-gray-300 px-4 py-2 font-semibold text-black dark:border-gray-600 dark:text-white'>
                    Experience
                  </td>
                  <td className='border border-gray-300 px-4 py-2 dark:border-gray-600'>
                    <input
                      type='number'
                      id='experience'
                      name='experience'
                      value={formData.experience}
                      onChange={handleChange}
                      className='w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                      placeholder='Enter required experience in years'
                    />
                  </td>
                </tr>

                {/* Deadline */}
                <tr>
                  <td className='border border-gray-300 px-4 py-2 font-semibold text-black dark:border-gray-600 dark:text-white'>
                    Deadline
                  </td>
                  <td className='border border-gray-300 px-4 py-2 dark:border-gray-600'>
                    <input
                      type='date'
                      id='deadline'
                      name='deadline'
                      value={formData.deadline}
                      onChange={handleChange}
                      className='w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className='mt-6 text-center'>
              <button
                type='submit'
                className='rounded-md bg-blue-500 px-4 py-2 text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
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
