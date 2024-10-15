import axiosInstance from '@/lib/axios'
import React, { useEffect, useState } from 'react'

// Define the interfaces for BenchRecord and Opening
interface BenchRecord {
  empId: string
  empName: string
  experience: number
  skills: string
  isInterviewScheduled?: boolean // Track if the interview is scheduled
  scheduledFor?: string // Track which project the interview is scheduled for
  status?: 'approved' | 'rejected' | 'scheduled'
}

interface Opening {
  id: string
  projectName: string
  openings: number
  clientName: string
  skills: string
  location: string
  experience: number // Added experience field for openings
  scheduledCandidates: BenchRecord[] // Store the scheduled candidates
}

const Rafts = () => {
  const [benchRecords, setBenchRecords] = useState<BenchRecord[]>([])
  const [openings, setOpenings] = useState<Opening[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [currentRecord, setCurrentRecord] = useState<BenchRecord | null>(null)
  const [currentOpening, setCurrentOpening] = useState<Opening | null>(null)
  const [openAccordions, setOpenAccordions] = useState<string[]>([]) // Track which accordions are open
  const [benchFilter, setBenchFilter] = useState('')
  const [openingFilter, setOpeningFilter] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch benched employees and project openings data
      const { data: benchedRecordsRes } =
        await axiosInstance.get('/benched-employee')
      const { data: openingsRes } = await axiosInstance.get(
        '/project-requirement'
      )

      // Fetch scheduled interviews
      const { data: scheduledInterviews } = await axiosInstance.get(
        '/scheduledInterviews'
      )
      const { data: projectsRes } = await axiosInstance.get('/project')

      // Transform the API response data into the required BenchRecord format
      const transformedBenchRecords: BenchRecord[] = benchedRecordsRes.map(
        (record: any) => {
          const interview = scheduledInterviews.find(
            (interview: any) => interview.empId === record.empId
          )

          return {
            empId: record.empId,
            empName: record.name,
            experience: record.experience,
            skills: record.skills,
            isInterviewScheduled: !!interview, // True if there's a scheduled interview
            scheduledFor: interview ? interview.projectName : undefined, // Project name if interview scheduled
            status: interview ? interview.status : undefined, // Interview status if scheduled
          }
        }
      )
      // console.log('sch', scheduledInterviews)

      // Transform the API response data into the required Opening format
      const transformedOpenings: Opening[] = openingsRes.map((opening: any) => {
        const scheduledCandidates = scheduledInterviews
          .filter((interview: any) => interview.openingId === opening.id)
          .map((interview: any) => {
            return {
              empId: interview.empId,
              empName: interview.empName,
              experience: interview.experience,
              skills: interview.skills,
              isInterviewScheduled: true, // Since it's in scheduled candidates, it's true
              scheduledFor: opening.projectName,
              status: interview.status,
            }
          })
        // console.log('schh', scheduledCandidates)

        return {
          id: opening.id,
          projectName: projectsRes.find(
            (project) => project.id === opening.projectId
          ).projectName, // Assuming projectId is the project name
          // projectName: opening.projectId, // Assuming projectId is the project name
          clientName: opening.clientName,
          skills: opening.skills,
          location: 'Not Provided', // Default value for location
          openings: opening.openings,
          experience: opening.experience,
          scheduledCandidates, // List of candidates scheduled for this project
        }
      })
      // Set the transformed data to state
      setBenchRecords(transformedBenchRecords)
      setOpenings(transformedOpenings)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  // Function to handle drag-and-drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, opening: Opening) => {
    e.preventDefault()
    const empId = e.dataTransfer.getData('text/plain')
    const record = benchRecords.find((record) => record.empId === empId)

    console.log('===>', record, opening)

    if (record) {
      // Check if there are openings available
      if (opening.openings <= 0) {
        setModalMessage(
          `No openings available for project ${opening.projectName}.`
        )
        setModalOpen(true)
        return
      }

      const skillsMatched = opening.skills
        .split(',')
        .filter((skill) => record.skills.includes(skill.trim())).length // Count matched skills
      const experienceMatched = record.experience >= opening.experience // Check if experience is equal or more than required

      const alreadyScheduled = record.scheduledFor === opening.id // Check if already scheduled for this opening

      if (alreadyScheduled) {
        setModalMessage(
          `Interview has already been scheduled for ${record.empName} for ${opening.projectName}.`
        )
        setModalOpen(true)
      } else if (skillsMatched >= 2 && experienceMatched) {
        setCurrentRecord(record)
        setCurrentOpening(opening) // Store the current opening
        setModalMessage(
          `Do you want to schedule an interview for ${record.empName} for project ${opening.projectName}?`
        )
        setModalOpen(true)
      } else if (skillsMatched < 2) {
        setModalMessage(
          `Can't schedule interview for ${record.empName} due to insufficient skills match.`
        )
        setModalOpen(true)
      } else {
        setModalMessage(
          `Experience level does not match for ${record.empName}. Required: ${opening.experience} years, Provided: ${record.experience} years.`
        )
        setModalOpen(true)
      }
    }
  }

  const confirmScheduleInterview = async () => {
    if (currentRecord && currentOpening) {
      const scheduledInterview = {
        empId: currentRecord.empId,
        empName: currentRecord.empName,
        openingId: currentOpening.id,
        projectName: currentOpening.projectName,
        skills: currentRecord.skills,
        experience: currentRecord.experience,
        status: 'scheduled',
      }

      // console.log('sch', currentOpening)

      const { data: status } = await axiosInstance.get(
        `/scheduledInterviews/${currentRecord.empId}/status/${currentOpening.id}`
      )

      if (status === 'notFound') {
        axiosInstance
          .post('/scheduledInterviews', scheduledInterview)
          .then(() => {
            fetchData()

            setModalOpen(false) // Close the modal
          })
          .catch((error) => {
            console.error('Error scheduling interview:', error)
            setModalMessage('Error scheduling interview. Please try again.')
            setModalOpen(true)
          })
      } else {
        alert(
          `The candidate has already been ${status.toUpperCase()} for this opening`
        )
        setModalOpen(false)
      }
    }
  }

  // Function to cancel scheduling and close the modal
  const cancelScheduleInterview = () => {
    setModalOpen(false) // Close the modal
  }

  // Toggle the accordion for the specific opening
  const toggleAccordion = (openingId: string) => {
    setOpenAccordions((prevAccordions) =>
      prevAccordions.includes(openingId)
        ? prevAccordions.filter((id) => id !== openingId)
        : [...prevAccordions, openingId]
    )
  }

  // Function to handle bench records filtering
  const filteredBenchRecords = benchRecords.filter((record) => {
    const lowerCaseFilter = benchFilter.toLowerCase()
    return (
      record.empId.toLowerCase().includes(lowerCaseFilter) ||
      record.empName.toLowerCase().includes(lowerCaseFilter) ||
      record.skills.toLowerCase().includes(lowerCaseFilter) ||
      record.experience.toString().includes(lowerCaseFilter)
    )
  })

  // Function to handle openings filtering
  const filteredOpenings = openings.filter((opening) => {
    const lowerCaseFilter = openingFilter.toLowerCase()
    return (
      opening.id.toLowerCase().includes(lowerCaseFilter) ||
      opening.projectName.toLowerCase().includes(lowerCaseFilter) ||
      opening.clientName.toLowerCase().includes(lowerCaseFilter) ||
      opening.skills.toLowerCase().includes(lowerCaseFilter) ||
      opening.location.toLowerCase().includes(lowerCaseFilter) ||
      opening.experience.toString().includes(lowerCaseFilter)
    )
  })

  const handleApprove = async (openingId: string, empId: string) => {
    await axiosInstance.put(
      `scheduledInterviews/${empId}/status/${openingId}/approved`
    )
    fetchData()
  }

  const handleReject = async (openingId: string, empId: string) => {
    await axiosInstance.put(
      `scheduledInterviews/${empId}/status/${openingId}/rejected`
    )
    fetchData()
  }

  return (
    <div className='flex h-screen'>
      {/* Left Side - Bench Records */}
      <div className='flex w-1/3 flex-col rounded-lg border bg-white p-4 shadow-md'>
        <h2 className='mb-4 text-center text-xl font-bold'>Bench Records</h2>
        <input
          type='text'
          placeholder='Filter Bench Records...'
          className='mb-8 h-8 rounded border p-2'
          value={benchFilter}
          onChange={(e) => setBenchFilter(e.target.value)}
        />
        {/* Fixed Headers */}
        <div className='mb-4 ml-2 grid  grid-cols-4 text-xs font-bold'>
          <div>Emp ID</div>
          <div>Emp Name</div>
          <div>Experience</div>
          <div className='ml-2'>Skills</div>
        </div>
        <div
          className='flex-1 overflow-y-auto'
          style={{ maxHeight: 'calc(100vh - 120px)' }}
        >
          {filteredBenchRecords.map((record) => (
            <div
              key={record.empId}
              className={`mb-2 grid grid-cols-4 rounded-lg border p-2 text-xs shadow-sm ${record.isInterviewScheduled ? 'bg-green-200' : 'bg-gray-100'}`}
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData('text/plain', record.empId)
              }
            >
              <div>{record.empId}</div>
              <div>{record.empName}</div>
              <div className='ml-3'>{record.experience} years</div>
              <div>{record.skills}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Openings */}
      <div className='flex w-2/3 flex-col rounded-lg border bg-white p-4 shadow-md'>
        <h2 className='mb-4 text-center text-xl font-bold'>Openings</h2>
        <input
          type='text'
          placeholder='Filter Openings...'
          className='mb-8 h-8 rounded border p-2'
          value={openingFilter}
          onChange={(e) => setOpeningFilter(e.target.value)}
        />
        {/* Fixed Headers */}
        <div className='mb-4 grid grid-cols-7 text-xs font-bold'>
          <div>Opening ID</div>
          <div>Project Name</div>
          <div>Client Name</div>
          <div className='ml-2'>Skills</div>
          <div>Location</div>
          <div>Experience</div>
          <div>Openings</div>
        </div>
        <div
          className='flex-1 overflow-y-auto'
          style={{ maxHeight: 'calc(100vh - 120px)' }}
        >
          {filteredOpenings.map((opening) => (
            <div
              className='mb-2 grid grid-cols-7 rounded-lg border p-2 text-xs shadow-sm'
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, opening)}
              key={opening.id}
            >
              <div>{opening.id}</div>
              <div>{opening.projectName}</div>
              <div className='ml-3'>{opening.clientName}</div>
              <div>{opening.skills}</div>
              <div>{opening.location}</div>
              <div className='ml-5'>{opening.experience} years</div>
              <div className='ml-8'>{opening.openings}</div>
              {/* Accordion for Scheduled Candidates */}
              {opening.scheduledCandidates.length > 0 && (
                <div className='col-span-6 mt-2'>
                  <button
                    className='w-full rounded bg-gray-100 p-2 text-left shadow-sm'
                    onClick={() => toggleAccordion(opening.id)}
                  >
                    {openAccordions.includes(opening.id)
                      ? '▼ Hide Scheduled Candidates'
                      : '▶ Scheduled Candidates'}
                  </button>

                  {openAccordions.includes(opening.id) && (
                    <div className='mt-2 rounded-lg bg-gray-50 p-4'>
                      {opening.scheduledCandidates.map((candidate) => (
                        <div
                          className={`mb-2 flex items-center justify-between ${candidate.status === 'approved' || candidate.status === 'rejected' ? 'bg-gray-300' : ''}`}
                          key={candidate.empId}
                        >
                          <strong>
                            {candidate.empId} - {candidate.empName}
                          </strong>
                          <div>
                            {candidate.status === 'approved' && (
                              <span className='text-green-600'>Approved</span>
                            )}
                            {candidate.status === 'rejected' && (
                              <span className='text-red-600'>Rejected</span>
                            )}
                          </div>
                          {candidate.status === 'scheduled' && (
                            <div className='flex space-x-2'>
                              <button
                                className='rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600'
                                onClick={() =>
                                  handleApprove(opening.id, candidate.empId)
                                }
                              >
                                Approve
                              </button>
                              <button
                                className='rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
                                onClick={() =>
                                  handleReject(opening.id, candidate.empId)
                                }
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Interview Confirmation */}
      {modalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='rounded-lg bg-white p-6 shadow-lg'>
            <p className='font-bold'>{modalMessage}</p>
            {modalMessage.includes('Do you want to schedule an interview') ? (
              <div className='mt-4 flex justify-end'>
                <button
                  className='mr-2 rounded bg-green-500 px-4 py-2 text-white'
                  onClick={confirmScheduleInterview}
                >
                  Confirm
                </button>
                <button
                  className='rounded bg-red-500 px-4 py-2 text-white'
                  onClick={cancelScheduleInterview}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className='mt-4 flex justify-end'>
                <button
                  className='rounded bg-blue-500 px-4 py-2 text-black'
                  onClick={cancelScheduleInterview}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Rafts
