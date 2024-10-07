import { useEffect, useState } from 'react';
import { Layout } from '@/components/custom/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { RecentSales } from './components/emp-highlight';
import { Overview } from './components/overview';
import axiosInstance from '@/lib/axios';
import { ClientData } from '../projects/components/data-table';

export default function Dashboard() {
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [totalOpenings, setTotalOpenings] = useState(0);
  const [totalBenchCandidates, setTotalBenchCandidates] = useState(0);

  useEffect(() => {
    const fetchTotalProjects = async () => {
      try {
        const response = await axiosInstance.get('/project');
        setTotalProjects(response.data.length);
      } catch (error) {
        console.error('Error fetching total projects:', error);
      }
    };

    const fetchTotalBenchCandidates = async () => {
      try {
        const response = await axiosInstance.get('/benched-employee');
        setTotalBenchCandidates(response.data.length);
      } catch (error) {
        console.error('Error fetching total bench candidates:', error);
      }
    };

    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get('/project'); 
        const projects: ClientData[] = response.data;
        const distinctClients = new Set(projects.map(client => client.clientName));
        setTotalClients(distinctClients.size);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    const calculateTotalOpenings = async () => {
      try {
        const response = await axiosInstance.get('/project-requirement'); 
        const openingsData = response.data;
        const totalOpenings = openingsData.reduce((sum: any, opening: { openings: any; }) => sum + (opening.openings || 0), 0);
        setTotalOpenings(totalOpenings);
      } catch (error) {
        console.error('Error fetching openings:', error);
      }
    };

    fetchTotalProjects();
    fetchTotalBenchCandidates();
    fetchClients();
    calculateTotalOpenings();
  }, []);

  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
        </div>
        <Tabs orientation='vertical' defaultValue='overview' className='space-y-4'>
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader>
                  <CardTitle className='text-sm font-medium'>Total Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{totalProjects}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className='text-sm font-medium'>Total Bench Candidates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{totalBenchCandidates}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className='text-sm font-medium'>Total Clients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{totalClients}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className='text-sm font-medium'>Total Openings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{totalOpenings}</div>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Client Project Overview</CardTitle>
                </CardHeader>
                <CardContent className='pl-2 pt-8'>
                  <Overview />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Employee Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  );
}
