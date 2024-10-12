import { FaClipboardList, FaCheckCircle } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as React from 'react';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/custom/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function ProjectDetails() {
    const [isOpenProjects, setIsOpenProjects] = React.useState<Record<string, boolean>>({
        Project_A: false,
        Project_B: false,
        Project_C: false,
        Project_D: false,
    });

    const toggleProject = (project: string) => {
        setIsOpenProjects((prev) => ({ ...prev, [project]: !prev[project] }));
    };

    const projects = {
        Project_A: [
            { name: 'Java Developer', fulfilled: 3, total: 5 },
            { name: 'React Developer', fulfilled: 2, total: 4 },
        ],
        Project_B: [
            { name: 'Full Stack Developer', fulfilled: 0, total: 2 },
        ],
        Project_C: [
            { name: 'Dev Ops', fulfilled: 1, total: 5 },
            { name: 'QA Tester', fulfilled: 3, total: 4 },
        ],
        Project_D: [
            { name: 'SDE2', fulfilled: 2, total: 2 },
            { name: 'SDE3', fulfilled: 1, total: 3 },
        ],
    };

    // Calculate total fulfilled and total openings
    const totalFulfilled = Object.values(projects).flat().reduce((acc, opening) => acc + opening.fulfilled, 0);
    const totalOpenings = Object.values(projects).flat().reduce((acc, opening) => acc + opening.total, 0);

    return (
        <div className='p-4'>
            <div className='grid gap-4 sm:grid-cols-2'>
                <Card className="text-sm p-2">
                    <CardHeader>
                        <CardTitle className='flex items-center'>
                            <FaClipboardList className='mr-2 text-lg' /> Total Job Openings Requested
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='text-xl font-bold'>{totalOpenings}</div>
                    </CardContent>
                </Card>
                <Card className="text-sm p-2">
                    <CardHeader>
                        <CardTitle className='flex items-center'>
                            <FaCheckCircle className='mr-2 text-lg' /> Total Job Openings Fulfilled
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='text-xl font-bold'>{totalFulfilled}</div>
                    </CardContent>
                </Card>
            </div>

            <div className='mt-4 grid gap-4 sm:grid-cols-2'>
                {Object.entries(projects).map(([projectKey, openings]) => {
                    const projectFulfilled = openings.reduce((acc, opening) => acc + opening.fulfilled, 0);
                    const projectTotal = openings.reduce((acc, opening) => acc + opening.total, 0);

                    return (
                        <Card key={projectKey} className="shadow-md border rounded-md text-sm p-2">
                            <Collapsible open={isOpenProjects[projectKey]} onOpenChange={() => toggleProject(projectKey)}>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <h4 
                                            className="text-md font-semibold"
                                            title={`${projectFulfilled} fulfilled / ${projectTotal} total`}
                                        >
                                            {`${projectKey.replace(/_/g, ' ')} (${projectFulfilled}/${projectTotal})`}
                                        </h4>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <CaretSortIcon className="h-4 w-4" />
                                                <span className="sr-only">Toggle</span>
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                </CardHeader>
                                <CollapsibleContent className="space-y-2 px-4 py-2">
                                    {openings.map((opening, index) => (
                                        <div 
                                            key={index} 
                                            className="rounded-md border px-4 py-2 font-mono text-xs shadow-sm"
                                            title={`${opening.fulfilled} fulfilled / ${opening.total} total`}
                                        >
                                            {`${opening.name}: ${opening.fulfilled}/${opening.total}`}
                                        </div>
                                    ))}
                                </CollapsibleContent>
                            </Collapsible>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
