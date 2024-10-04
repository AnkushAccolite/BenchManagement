import { Layout } from '@/components/custom/layout';
import { useState } from 'react';

// Sample data for project names and skills
const ClientNames = ['FedEx', 'Flipkart', 'Morgan Stanley', 'Goldman Sachs', 'Fidelity', 'NASDAQ'];

export default function AddProject() {
  const initialFormState = {
    projectId: '',
    clientName: '',
    projectName: '',
    projectHead: '',
    departmentName: '',
    departmentHead: '',
    location: '',
    openings: [] as { skills: string[], count: string }[],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [, setSelectedSkills] = useState<string[]>([]);
  const [, setOpeningCount] = useState('');

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Make sure all the fields are filled in
    alert('Project added successfully!');
    console.log('Submitted Data:', formData);
    setFormData(initialFormState);
    setSelectedSkills([]);
    setOpeningCount('');
  };

  return (
    <Layout>
      <Layout.Header sticky>
        <div className='ml-auto flex items-center space-x-4'>
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className="shadow-md rounded-md p-1 mt-1">
          <h2 className="text-xl font-semibold mb-4 text-center text-black dark:text-white">Add New Project</h2>

          <form onSubmit={handleSubmit}>
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
              <tbody>
                <tr>
                  <td className="px-4 py-2 border border-gray-300 font-semibold text-black dark:text-white dark:border-gray-600">Project ID</td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                    <input
                      type="text"
                      id="projectId"
                      name="projectId"
                      value={formData.projectId}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
                      placeholder="Enter Project ID"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-300 font-semibold text-black dark:text-white dark:border-gray-600">Client Name</td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                    <select
                      id="clientName"
                      name="clientName"
                      value={formData.clientName}
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
                    <input
                      type="text"
                      id="projectName"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
                      placeholder="Enter Project Name"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-300 font-semibold text-black dark:text-white dark:border-gray-600">Project Head</td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                    <input
                      type="text"
                      id="projectHead"
                      name="projectHead"
                      value={formData.projectHead}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
                      placeholder="Enter Project Head"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-300 font-semibold text-black dark:text-white dark:border-gray-600">Department Name</td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                    <input
                      type="text"
                      id="departmentName"
                      name="departmentName"
                      value={formData.departmentName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
                      placeholder="Enter Department Name"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-300 font-semibold text-black dark:text-white dark:border-gray-600">Department Head</td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                    <input
                      type="text"
                      id="departmentHead"
                      name="departmentHead"
                      value={formData.departmentHead}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
                      placeholder="Enter Department Head"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-300 font-semibold text-black dark:text-white dark:border-gray-600">Location</td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
                      placeholder="City, Country" // Placeholder added here
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
