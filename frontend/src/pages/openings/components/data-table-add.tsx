import { Layout } from '@/components/custom/layout'
// import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import React, { useState } from 'react';

// Sample data for project names and skills
const ClientNames = ['MS', 'GS', 'Fidelity'];
const projectNames = ['Project A', 'Project B', 'Project C'];
const skillOptions = ['JavaScript', 'Python', 'Java', 'React', 'Spring Boot'];

export default function AddProject() {
    const [formData, setFormData] = useState({
        ClientNames: '',
        projectName: '',
        skills: '',
        openings: 0,
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const confirmed = window.confirm('Please confirm your submission.');
    
        if (confirmed) {
            console.log('Form Data:', formData);
            // Handle form submission here (e.g., send data to backend)
        }
    };

    return (
        <Layout>
            {/* ===== Top Heading ===== */}
            <Layout.Header sticky>
                {/* <Search /> */}
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <div className=" shadow-md rounded-md p-8 mt-8">
                    <h2 className="text-xl font-semibold mb-8 text-center text-black dark:text-white">Add New Project</h2>

                    <form onSubmit={handleSubmit}>
                        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 border border-gray-300 font-semibold text-black dark:text-white dark:border-gray-600">Client Name</td>
                                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                        <select
                                            id="clientName"
                                            name="ClientNames"
                                            value={formData.ClientNames}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
                                            required
                                        >
                                            <option value="">Select a Client</option>
                                            {ClientNames.map((client, index) => (
                                                <option key={index} value={client}>
                                                    {client}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border border-gray-300 font-semibold text-black dark:text-white dark:border-gray-600">Project Name</td>
                                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                        <select
                                            id="projectName"
                                            name="projectName"
                                            value={formData.projectName}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
                                            required
                                        >
                                            <option value="">Select a project</option>
                                            {projectNames.map((project, index) => (
                                                <option key={index} value={project}>
                                                    {project}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border border-gray-300 font-semibold text-black dark:text-white dark:border-gray-600">Skills</td>
                                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                        <select
                                            id="skills"
                                            name="skills"
                                            value={formData.skills}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
                                            required
                                        >
                                            <option value="">Select skills</option>
                                            {skillOptions.map((skill, index) => (
                                                <option key={index} value={skill}>
                                                    {skill}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border border-gray-300 font-semibold text-black dark:text-white dark:border-gray-600">Openings</td>
                                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                        <input
                                            type="number"
                                            id="openings"
                                            name="openings"
                                            value={formData.openings}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
                                            placeholder="Enter number of openings"
                                            min="1"
                                            required
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Submit Button */}
                        <div className="mt-4 flex justify-center">
                            <button
                                type="submit"
                                className="bg-black dark:bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-black dark:hover:bg-gray-500 focus:outline-none focus:ring focus:ring-black dark:focus:ring-gray-500"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </Layout.Body>
        </Layout>
    );
}
