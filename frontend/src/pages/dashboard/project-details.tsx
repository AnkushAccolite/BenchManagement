import React, { useState, useEffect } from 'react'
import { FaProjectDiagram, FaUsers, FaTasks } from 'react-icons/fa'
import axiosInstance from '@/lib/axios'

// Type Definitions
interface Project {
  id: string
  projectName: string
  clientName: string
  projectHead: string
  deptName: string
  deptHead: string
  location: string
  startDate: string
  endDate: string
}

interface Opening {
  id: string
  projectId: string
  clientName: string
  skills: string
  openings: number
  experience: number
  deadline: string
}

interface Interview {
  id: string
  empId: string
  empName: string
  openingId: string
  projectName: string
  skills: string
  experience: number
  status: string
}

// Component
const ProjectDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [openings, setOpenings] = useState<Opening[]>([])
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClient, setSelectedClient] = useState<string | null>(null)
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(
    null
  )
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])

  // Fetch projects, openings, and interviews from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectRes, openingsRes, interviewsRes] = await Promise.all([
          axiosInstance.get('/project'),
          axiosInstance.get('/project-requirement'),
          axiosInstance.get('/scheduledInterviews'),
        ])

        setProjects(projectRes.data)
        setOpenings(openingsRes.data)
        setInterviews(interviewsRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  // Filter Projects based on search term and client
  useEffect(() => {
    let filtered = projects

    if (selectedClient) {
      filtered = filtered.filter(
        (project) => project.clientName === selectedClient
      )
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.projectName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          openings.some(
            (opening) =>
              opening.skills.toLowerCase().includes(searchTerm.toLowerCase()) &&
              opening.projectId === project.id
          )
      )
    }

    setFilteredProjects(filtered)
  }, [searchTerm, selectedClient, projects, openings])

  // Handle project card click to toggle expanded state
  const handleProjectClick = (projectId: string) => {
    setExpandedProjectId(expandedProjectId === projectId ? null : projectId)
  }

  // Calculate statistics
  const totalProjects = projects.length
  const totalPositions = openings.reduce(
    (sum, opening) => sum + opening.openings,
    0
  )
  const totalUnfulfilled = openings.reduce((sum, opening) => {
    const fulfilled = interviews.filter(
      (interview) => interview.openingId === opening.id
    ).length
    return sum + (opening.openings - fulfilled)
  }, 0)

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      {/* Statistics Section */}
      <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-3'>
        <div className='flex items-center rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white shadow'>
          <FaProjectDiagram className='mr-4 text-4xl' />
          <div>
            <h2 className='text-2xl font-semibold'>Total Projects</h2>
            <p className='text-lg'>{totalProjects}</p>
          </div>
        </div>
        <div className='flex items-center rounded-lg bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white shadow'>
          <FaTasks className='mr-4 text-4xl' />
          <div>
            <h2 className='text-2xl font-semibold'>Total Positions</h2>
            <p className='text-lg'>{totalPositions}</p>
          </div>
        </div>
        <div className='flex items-center rounded-lg bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white shadow'>
          <FaUsers className='mr-4 text-4xl' />
          <div>
            <h2 className='text-2xl font-semibold'>Unfulfilled Positions</h2>
            <p className='text-lg'>{totalUnfulfilled}</p>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className='mb-6 flex items-center justify-between'>
        <input
          type='text'
          placeholder='Search by project, client or skills...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-1/2'
        />

        <select
          value={selectedClient || ''}
          onChange={(e) => setSelectedClient(e.target.value || null)}
          className='rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value=''>All Clients</option>
          {projects.map((project) => (
            <option key={project.clientName} value={project.clientName}>
              {project.clientName}
            </option>
          ))}
        </select>
      </div>

      {/* Projects Grid */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className='cursor-pointer rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl'
            onClick={() => handleProjectClick(project.id)}
          >
            <h2 className='mb-1 text-xl font-semibold text-gray-800'>
              {project.projectName}
            </h2>
            <p className='text-gray-600'>Client: {project.clientName}</p>
            <p className='text-gray-600'>
              Openings:{' '}
              {
                openings.filter((opening) => opening.projectId === project.id)
                  .length
              }
            </p>

            {/* Expandable Section for Openings */}
            {expandedProjectId === project.id && (
              <div className='mt-4'>
                {openings
                  .filter((opening) => opening.projectId === project.id)
                  .map((opening) => {
                    const fulfilled = interviews.filter(
                      (interview) => interview.openingId === opening.id
                    ).length
                    return (
                      <div
                        key={opening.id}
                        className='mt-2 rounded-lg bg-gray-50 p-4'
                      >
                        <h3 className='text-md font-medium text-gray-700'>
                          {opening.skills}
                        </h3>
                        <p className='text-sm text-gray-500'>
                          Positions: {fulfilled}/{opening.openings} fulfilled
                        </p>
                        <div className='mt-1 h-2 w-full rounded bg-gray-200'>
                          <div
                            className='h-2 rounded bg-blue-500'
                            style={{
                              width: `${(fulfilled / opening.openings) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectDashboard
