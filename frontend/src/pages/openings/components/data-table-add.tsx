// import { Layout } from '@/components/custom/layout'
// import ThemeSwitch from '@/components/theme-switch'
// import { UserNav } from '@/components/user-nav'
// import { useState } from 'react';

// const ClientNames = ['Morgan Stanley', 'Goldman Sachs', 'Fidelity'];
// const projectNames = ['Project A', 'Project B', 'Project C'];
// const skillOptions = ['JavaScript', 'Python', 'Java', 'React', 'Spring Boot','Angular','CI/CD','C++','Hibernate','MySQL','MongoDB'];

// export default function AddProject() {
//   const initialFormState = {
//     clientName: '',
//     projectName: '',
//     openings: [] as { skills: string[], count: string }[],
//   };

//   const [formData, setFormData] = useState(initialFormState);
//   const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
//   const [openingCount, setOpeningCount] = useState('');

//   const handleChange = (e: { target: { name: string; value: string } }) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSkillChange = (e: { target: { value: string } }) => {
//     const skill = e.target.value;

//     // If the skill is already selected, remove it, else add it
//     if (selectedSkills.includes(skill)) {
//       setSelectedSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
//     } else {
//       setSelectedSkills((prevSkills) => [...prevSkills, skill]);
//     }
//   };

//   const addOpening = () => {
//     if (selectedSkills.length === 0 || openingCount.trim() === '') {
//       alert('Please add skills and opening to the Add Opening field.');
//       return;
//     }

//     setFormData((prevState) => ({
//       ...prevState,
//       openings: [...prevState.openings, { skills: selectedSkills, count: openingCount }],
//     }));
//     setSelectedSkills([]);
//     setOpeningCount('');
//   };

//   const handleSubmit = (e: { preventDefault: () => void }) => {
//     e.preventDefault();

//     if (formData.openings.length === 0) {
//       alert('Please add at least one opening before submitting the project.');
//       return;
//     }

//     alert('Project added successfully!');
//     console.log('Submitted Openings:', formData.openings);
//     setFormData(initialFormState);
//     setSelectedSkills([]);
//     setOpeningCount('');
//   };

//   const removeSkill = (skill: string) => {
//     setSelectedSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
//   };

//   return (
//     <Layout>
//       <Layout.Header sticky>
//         <div className='ml-auto flex items-center space-x-4'>
//           <ThemeSwitch />
//           <UserNav />
//         </div>
//       </Layout.Header>

//       <Layout.Body>
//         <div className="shadow-md rounded-md p-8 mt-8">
//           <h2 className="text-xl font-semibold mb-8 text-center text-black dark:text-white">Add New Project</h2>

//           <form onSubmit={handleSubmit}>
//             <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 table-fixed">
//               <tbody>
//                 <tr>
//                   <td className="px-4 py-2 border border-gray-300 font-semibold text-black dark:text-white dark:border-gray-600">Client Name</td>
//                   <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
//                     <select
//                       id="clientName"
//                       name="clientName"
//                       value={formData.clientName}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
//                       required
//                     >
//                       <option value="">Select a Client</option>
//                       {ClientNames.map((client, index) => (
//                         <option key={index} value={client}>
//                           {client}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="px-4 py-2 border border-gray-300 font-semibold text-black dark:text-white dark:border-gray-600">Project Name</td>
//                   <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
//                     <select
//                       id="projectName"
//                       name="projectName"
//                       value={formData.projectName}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
//                       required
//                     >
//                       <option value="">Select a project</option>
//                       {projectNames.map((project, index) => (
//                         <option key={index} value={project}>
//                           {project}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                 </tr>

//                 {/* Multiple Skills Selection */}
//                 <tr>
//                   <td className="px-4 py-2 border border-gray-300 font-semibold text-black dark:text-white dark:border-gray-600">Skills</td>
//                   <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
//                     <select
//                       id="skills"
//                       name="skills"
//                       value=""
//                       onChange={handleSkillChange}
//                       className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
//                     >
//                       <option value="">Select a skill</option>
//                       {skillOptions.map((skill, index) => (
//                         <option key={index} value={skill}>
//                           {skill}
//                         </option>
//                       ))}
//                     </select>

//                     {/* Show selected skills with an option to remove */}
//                     <div className="mt-2">
//                       <div className="flex flex-wrap gap-2 mt-1">
//                         {selectedSkills.length > 0
//                           ? selectedSkills.map((skill) => (
//                               <div key={skill} className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded flex items-center">
//                                 <span>{skill}</span>
//                                 <button
//                                   type="button"
//                                   onClick={() => removeSkill(skill)}
//                                   className="ml-2 text-red-500"
//                                 >
//                                   &times;
//                                 </button>
//                               </div>
//                             ))
//                           : <span></span>}
//                       </div>
//                     </div>
//                   </td>
//                 </tr>

//                 {/* Openings Textbox */}
//                 <tr>
//                   <td className="px-4 py-2 border border-gray-300 font-semibold text-black dark:text-white dark:border-gray-600">Openings</td>
//                   <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
//                     <input
//                       type="text"
//                       id="openings"
//                       name="openings"
//                       value={openingCount}
//                       onChange={(e) => setOpeningCount(e.target.value)}
//                       className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
//                       placeholder="Enter number of openings"
//                     />
//                   </td>
//                 </tr>

//                 {/* Add Opening Button */}
//                 <tr>
//                   <td colSpan={2} className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left">
//                     <button
//                       type="button"
//                       onClick={addOpening}
//                       className="bg-black dark:bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-black dark:hover:bg-gray-500 focus:outline-none focus:ring focus:ring-black dark:focus:ring-gray-500"
//                     >
//                       Add Opening
//                     </button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>

//             {/* Display Added Openings */}
//             {formData.openings.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="text-lg font-semibold text-black dark:text-white">Added Openings:</h3>
//                 <ul className="list-disc pl-5">
//                   {formData.openings.map((opening, index) => (
//                     <li key={index} className="text-black dark:text-white">
//                       {`Skills: ${opening.skills.join(', ')}, Openings: ${opening.count}`}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Submit Button */}
//             <div className="mt-4 flex justify-center">
//               <button
//                 type="submit"
//                 className="bg-black dark:bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-black dark:hover:bg-gray-500 focus:outline-none focus:ring focus:ring-black dark:focus:ring-gray-500"
//               >
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </Layout.Body>
//     </Layout>
//   );
// }

import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import axiosInstance from '@/lib/axios'
import { useEffect, useState } from 'react'

// const ClientNames = [
//   'Morgan Stanley',
//   'Goldman Sachs',
//   'Fidelity',
//   'NASDAQ',
//   'British Telecom',
//   'Flipkart',
// ]
// const projectNames = ['Project A', 'Project B', 'Project C']
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
  }

  const [formData, setFormData] = useState(initialFormState)
  const [projectNames, setProjectNames] = useState([])
  const [clientNames, setClientNames] = useState([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosInstance.get('/project')
      const projects = data.map((project) => ({
        id: project.projectId,
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
    // console.log('--->', formData)
    try {
      e.preventDefault()
      let payload = formData
      payload.skills = selectedSkills.join(', ')
      delete payload.projectName
      // setFormData((prev) => (prev.skills = selectedSkills.join(', ')))
      // setFormData((prev) => {
      //   delete prev.projectName
      //   return prev
      // })
      // console.log('--->', formData)
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
            Add New Project
          </h2>

          <form onSubmit={handleSubmit}>
            <table className='min-w-full table-fixed border-collapse border border-gray-300 dark:border-gray-600'>
              <tbody>
                <tr>
                  <td
                    className='border border-gray-300 px-4 py-2 font-semibold text-black dark:border-gray-600 dark:text-white'
                    style={{ width: '200px' }}
                  >
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
                <tr>
                  <td
                    className='border border-gray-300 px-4 py-2 font-semibold text-black dark:border-gray-600 dark:text-white'
                    style={{ width: '200px' }}
                  >
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

                {/* Multiple Skills Selection */}
                <tr>
                  <td
                    className='border border-gray-300 px-4 py-2 font-semibold text-black dark:border-gray-600 dark:text-white'
                    style={{ width: '200px' }}
                  >
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

                    {/* Show selected skills with an option to remove */}
                    <div className='mt-2'>
                      <div className='mt-1 flex flex-wrap gap-2'>
                        {selectedSkills.length > 0 ? (
                          selectedSkills.map((skill) => (
                            <div
                              key={skill}
                              className='mb-1 flex items-center rounded bg-gray-200 px-2 py-1 text-black dark:bg-gray-700 dark:text-white'
                            >
                              {' '}
                              {/* Add mb-1 for vertical spacing */}
                              <span>{skill}</span>
                              <button
                                type='button'
                                onClick={() => removeSkill(skill)}
                                className='ml-2 text-red-500'
                              >
                                &times;
                              </button>
                            </div>
                          ))
                        ) : (
                          <span></span>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Openings Textbox */}
                <tr>
                  <td
                    className='border border-gray-300 px-4 py-2 font-semibold text-black dark:border-gray-600 dark:text-white'
                    style={{ width: '200px' }}
                  >
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
