import React, { useEffect, useState } from 'react'

// Define the interfaces for BenchRecord and Opening
interface BenchRecord {
  empId: string
  empName: string
  experience: number
  skills: string
  isInterviewScheduled?: boolean // Track if the interview is scheduled
  scheduledFor?: string // Track which project the interview is scheduled for
  status?: 'approved' | 'rejected'
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
    // Dummy data for bench records
    const dummyBenchRecords: BenchRecord[] = [
      {
        empId: 'E001',
        empName: 'John Doe',
        experience: 5,
        skills: 'Java, Spring Boot',
      },
      {
        empId: 'E002',
        empName: 'Jane Smith',
        experience: 1,
        skills: 'React, Node.js',
      },
      {
        empId: 'E003',
        empName: 'Aroshi',
        experience: 2,
        skills: 'React, Node.js',
      },
      {
        empId: 'E004',
        empName: 'Rishika',
        experience: 4,
        skills: 'Java, Spring Boot',
      },
      // Add more records...
    ]

    // Dummy data for openings
    const dummyOpenings: Opening[] = [
      {
        id: 'O001',
        projectName: 'Project Alpha',
        openings: 3,
        clientName: 'Client A',
        skills: 'Java, Spring Boot,React',
        location: 'New York',
        experience: 4,
        scheduledCandidates: [],
      },
      {
        id: 'O002',
        projectName: 'Project Beta',
        openings: 2,
        clientName: 'Client B',
        skills: 'React, Node.js',
        location: 'San Francisco',
        experience: 2,
        scheduledCandidates: [],
      },
      {
        id: 'O003',
        projectName: 'Project Gamma',
        openings: 1,
        clientName: 'Client C',
        skills: 'Java, Spring Boot,React',
        location: 'New York',
        experience: 4,
        scheduledCandidates: [],
      },
      // Add more openings...
    ]

    // Setting the dummy data
    setBenchRecords(dummyBenchRecords)
    setOpenings(dummyOpenings)
  }, [])

  // Function to handle drag-and-drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, opening: Opening) => {
    e.preventDefault()
    const empId = e.dataTransfer.getData('text/plain')
    const record = benchRecords.find((record) => record.empId === empId)

    if (record) {
      // Check if there are openings available
      if (opening.openings <= 0) {
        setModalMessage(`No openings available for project ${opening.projectName}.`)
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

  // Function to confirm interview scheduling
  const confirmScheduleInterview = () => {
    if (currentRecord && currentOpening) {
      // Remove the record from benchRecords
      setBenchRecords((prevRecords) =>
        prevRecords.filter((record) => record.empId !== currentRecord.empId)
      )

      // Add the record to the scheduledCandidates of the corresponding opening
      setOpenings((prevOpenings) =>
        prevOpenings.map((opening) =>
          opening.id === currentOpening.id
            ? {
                ...opening,
                scheduledCandidates: [
                  ...opening.scheduledCandidates,
                  { ...currentRecord, scheduledFor: currentOpening.id },
                ],
              }
            : opening
        )
      )

      setModalOpen(false) // Close the modal
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

  const handleApprove = (openingId: string, empId: string) => {
    setOpenings((prevOpenings) =>
      prevOpenings.map((opening) => {
        if (opening.id === openingId) {
          const updatedCandidates = opening.scheduledCandidates.map(
            (candidate) =>
              candidate.empId === empId
                ? { ...candidate, status: 'approved' }
                : candidate
          )
          return {
            ...opening,
            openings: opening.openings - 1, // Reduce openings by 1 when approved
            scheduledCandidates: updatedCandidates,
          }
        }
        return opening
      })
    )
  }

  const handleReject = (openingId: string, empId: string) => {
    setOpenings((prevOpenings) =>
      prevOpenings.map((opening) => {
        if (opening.id === openingId) {
          const updatedCandidates = opening.scheduledCandidates.map(
            (candidate) =>
              candidate.empId === empId
                ? { ...candidate, status: 'rejected' }
                : candidate
          )
          return {
            ...opening,
            scheduledCandidates: updatedCandidates,
          }
        }
        return opening
      })
    )
  }

  return (
    <div className='flex h-screen'>
      {/* Left Side - Bench Records */}
      <div className='w-1/3 flex flex-col rounded-lg border bg-white p-4 shadow-md'>
        <h2 className='mb-4 text-xl font-bold text-center'>Bench Records</h2>
        <input
          type='text'
          placeholder='Filter Bench Records...'
          className='mb-8 rounded border p-2 h-8'
          value={benchFilter}
          onChange={(e) => setBenchFilter(e.target.value)}
        />
        {/* Fixed Headers */}
        <div className='mb-4 grid grid-cols-4  font-bold text-xs ml-2'>
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
              className={`mb-2 grid grid-cols-4 rounded-lg border p-2 shadow-sm text-xs ${record.isInterviewScheduled ? 'bg-green-200' : 'bg-gray-100'}`}
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
        <h2 className='mb-4 text-xl font-bold text-center'>Openings</h2>
        <input
          type='text'
          placeholder='Filter Openings...'
          className='mb-8 rounded border p-2 h-8'
          value={openingFilter}
          onChange={(e) => setOpeningFilter(e.target.value)}
        />
        {/* Fixed Headers */}
        <div className='mb-4 grid grid-cols-7 font-bold text-xs'>
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
              className='mb-2 grid grid-cols-7 rounded-lg border p-2 shadow-sm text-xs'
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
                          {!candidate.status && (
                            <div className='flex space-x-2'>
                              <button
                                className='rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600'
                                onClick={() => handleApprove(opening.id, candidate.empId)}
                              >
                                Approve
                              </button>
                              <button
                                className='rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
                                onClick={() => handleReject(opening.id, candidate.empId)}
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
