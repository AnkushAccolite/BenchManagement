import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import axiosInstance from '@/lib/axios';

interface Project {
  clientName: string;
  projectId: string;
}

interface AggregatedData {
  name: string;
  total: number;
}

export function Overview() {
  const [clientProjectsData, setClientProjectsData] = useState<AggregatedData[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get('/project');
        const projects = response.data;

        setClientProjectsData(aggregateProjectsByClient(projects));
      } catch (error) {
        console.error('Error fetching projects');
      }
    };

    fetchProjects();
  }, []);

  const aggregateProjectsByClient = (projects: Project[]): AggregatedData[] => {
    const projectCount: { [key: string]: number } = {};

    projects.forEach((project) => {
      const clientName = project.clientName;
      projectCount[clientName] = (projectCount[clientName] || 0) + 1;
    });

    return Object.entries(projectCount).map(([clientName, count]) => ({
      name: clientName,
      total: count,
    }));
  };

  const maxTotal = Math.max(...clientProjectsData.map((data) => data.total));

  const ticks = Array.from({ length: maxTotal + 1 }, (_, i) => i);

  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={clientProjectsData}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={10}
          tickLine={false}
          axisLine={false}
          ticks={ticks}
          domain={[0, maxTotal]}
          tickFormatter={(value) => value.toString()}
          label={{
            value: 'Number of Projects',
            angle: -90,
            position: 'insideLeft',
            offset: 10,
            style: { textAnchor: 'middle' }
          }}
        />
        <Bar
          dataKey='total'
          fill='currentColor'
          radius={[4, 4, 0, 0]}
          className='fill-primary'
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
