import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import axios from 'axios';

interface Employee {
  empId: string;
  name: string;
  avatarUrl: string;
  ageing: number;
}

export function RecentSales() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/benched-employee'); // Adjust the endpoint as needed
      const data = response.data;

      // Sort by aging in descending order and get the top 5
      const sortedEmployees = data
        .sort((a: Employee, b: Employee) => b.ageing - a.ageing)
        .slice(0, 5);

      setEmployees(sortedEmployees);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();

    const interval = setInterval(fetchEmployees, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='space-y-8'>
      {employees.map((employee) => (
        <div className='flex items-center' key={employee.empId}>
          <Avatar className='h-9 w-9'>
            <AvatarImage src={employee.avatarUrl || '/default-avatar.png'} alt='Avatar' />
            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className='ml-4 flex justify-between w-full'>
            <div className='space-y-1'>
              <p className='text-sm font-medium leading-none'>{employee.name}</p>
              <p className='text-sm text-muted-foreground'>{employee.empId}</p>
            </div>
            <div className='ml-4 font-medium'>{employee.ageing} days</div>
          </div>
        </div>
      ))}
    </div>
  );
}
