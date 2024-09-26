// pages/data-table-add.tsx
import React from 'react';
import { Button } from '@/components/custom/button'; // Update path as necessary
import { Input } from '@/components/ui/input'; // Update path as necessary

const DataTableAdd = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newItem = Object.fromEntries(formData);
    console.log("New Item Submitted:", newItem);
    // Additional logic for handling new item submission (e.g., API calls)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Add New Item</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            type="text" 
            name="projectId" 
            placeholder="Project ID" 
            required 
            className="w-full" 
          />
          <Input 
            type="text" 
            name="projectName" 
            placeholder="Project Name" 
            required 
            className="w-full" 
          />
          <Input 
            type="text" 
            name="clientName" 
            placeholder="Client Name" 
            required 
            className="w-full" 
          />
          <Input 
            type="text" 
            name="requirements" 
            placeholder="Requirements" 
            required 
            className="w-full" 
          />
          <Input 
            type="text" 
            name="projectHead" 
            placeholder="Project Head" 
            required 
            className="w-full" 
          />
          <Input 
            type="text" 
            name="department" 
            placeholder="Department" 
            required 
            className="w-full" 
          />
          <Input 
            type="text" 
            name="departmentHead" 
            placeholder="Department Head" 
            required 
            className="w-full" 
          />
          <Input 
            type="text" 
            name="deadline" 
            placeholder="Deadline" 
            required 
            className="w-full" 
          />
          <Input 
            type="text" 
            name="location" 
            placeholder="Location" 
            required 
            className="w-full" 
          />
          <Button type="submit" className="w-full mt-4">
            Add Item
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DataTableAdd;
