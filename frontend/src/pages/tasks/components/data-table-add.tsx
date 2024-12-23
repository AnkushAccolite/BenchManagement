import { Layout } from '@/components/custom/layout';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { useState } from 'react';
import axios from 'axios';

// Sample data for client names
const clientNames = ['Morgan Stanley', 'Goldman Sachs', 'Fidelity', 'J.P. Morgan', 'British Telecom'];

// Define initial form data
const initialFormData = {
    empId: '',
    name: '',
    skills: '',
    experience: 0,
    doj: '',
    baseLocation: '',
    benchedOn: '',
};

export default function AddEmployee() {
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const confirmed = window.confirm('Please confirm your submission.');

        if (confirmed) {
            console.log('Form Data:', formData);
            if (formData.benchedOn) {
                const date = new Date(formData.benchedOn);
                formData.benchedOn = date.toLocaleDateString('en-GB').replace(/\//g, '-'); // Formats date as dd/MM/yyyy
            }
            axios.post("http://localhost:8080/benched-employee", formData)
                .then(() => {
                    // Reset the form to initial values
                    setFormData(initialFormData);
                })
                .catch(error => console.log(error));
        }
    };

    return (
        <Layout>
            <Layout.Header sticky>
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <div className="shadow-md rounded-md p-8 -mt-1">
                    <h2 className="text-xl font-semibold mb-8 text-center text-black dark:text-white">Add Employee to Bench</h2>

                    <form onSubmit={handleSubmit}>
                        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                            <tbody>
                                {/* Emp Id */}
                                <tr>
                                    <td className="px-4 py-2 border border-gray-300 font-semibold text-black dark:text-white dark:border-gray-600">Emp Id</td>
                                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                        <input
                                            type="text"
                                            id="empId"
                                            name="empId"
                                            value={formData.empId}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
                                            placeholder="Enter Emp Id"
                                            required
                                        />
                                    </td>
                                </tr>

                                {/* Emp Name */}
                                <tr>
                                    <td className="px-4 py-2 border border-gray-300 font-semibold text-black dark:text-white dark:border-gray-600">Emp Name</td>
                                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
                                            placeholder="Enter Emp Name"
                                            required
                                        />
                                    </td>
                                </tr>

                                {/* Skills */}
                                <tr>
                                    <td className="px-4 py-2 border border-gray-300 font-semibold text-black dark:text-white dark:border-gray-600">Skills</td>
                                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                        <input
                                            type="text"
                                            id="skills"
                                            name="skills"
                                            value={formData.skills}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
                                            placeholder="Enter Skills (comma-separated)"
                                            required
                                        />
                                    </td>
                                </tr>

                                {/* Experience */}
                                <tr>
                                    <td className="px-4 py-2 border border-gray-300 font-semibold text-black dark:text-white dark:border-gray-600">Experience (Years)</td>
                                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                        <input
                                            type="number"
                                            id="experience"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
                                            placeholder="Enter Experience in Years"
                                            min="0"
                                            required
                                        />
                                    </td>
                                </tr>

                                {/* Accolite DOJ */}
                                <tr>
                                    <td className="px-4 py-2 border border-gray-300 font-semibold text-black dark:text-white dark:border-gray-600">Accolite DOJ</td>
                                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                        <input
                                            type="date"
                                            id="doj"
                                            name="doj"
                                            value={formData.doj}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
                                            required
                                        />
                                    </td>
                                </tr>

                                {/* Base Location */}
                                <tr>
                                    <td className="px-4 py-2 border border-gray-300 font-semibold text-black dark:text-white dark:border-gray-600">Base Location</td>
                                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                        <input
                                            type="text"
                                            id="baseLocation"
                                            name="baseLocation"
                                            value={formData.baseLocation}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
                                            placeholder="Enter Base Location"
                                            required
                                        />
                                    </td>
                                </tr>

                                {/* Bench DOJ */}
                                <tr>
                                    <td className="px-4 py-2 border border-gray-300 font-semibold text-black dark:text-white dark:border-gray-600">Bench DOJ</td>
                                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                                        <input
                                            type="date"
                                            id="benchedOn"
                                            name="benchedOn"
                                            value={formData.benchedOn}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
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
