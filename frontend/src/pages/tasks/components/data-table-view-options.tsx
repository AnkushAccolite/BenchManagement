import { useNavigate } from 'react-router-dom'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
// import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import axiosInstance from '@/lib/axios'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [originalData, setOriginalData] = useState([])

  const handleAddClick = () => {
    navigate('/add-employee')
  }

  useEffect(() => {
    const getOpenings = async () => {
      try {
        // Fetch project requirements and projects
        const { data: reqResponse } = await axiosInstance.get(
          '/project-requirement'
        )
        const { data: projResponse } = await axiosInstance.get('/project')

        // Merge the responses
        const mergedData = reqResponse.map((req) => {
          const project = projResponse.find(
            (proj) => proj.projectId === req.projectId
          )

          // Create the object for the new data structure
          return {
            id: req.id,
            projectId: req.projectId,
            projectName: project ? project.projectName : 'Unknown Project',
            openings: req.openings,
            clientName: req.clientName,
            skills: req.skills,
            location: project ? project.location : 'Unknown Location',
          }
        })

        // Generate a new array for select options with 'value' and 'label'
        const selectOptions = mergedData.map((req) => ({
          value: req.id,
          label: `${req.id} - ${req.projectName} - ${req.skills}`,
        }))

        // console.log('-->', selectOptions)

        // Set the transformed data for the select dropdown
        setData(selectOptions)

        // Save the original mergedData to another state for later use
        setOriginalData(mergedData)
      } catch (error) {
        console.log(error)
      }
    }
    getOpenings()
    // setSelectedRows(sRows)
  }, [])

  const [selectedOpening, setSelectedOpening] = useState('')

  const scheduleInterview = async () => {
    try {
      const selectedRows = table
        .getSelectedRowModel()
        .rows.map((row) => row.original.id)
      if (selectedRows.length < 1) alert('Atleast select one employee')
      else {
        const res = axiosInstance.patch(
          `/project-requirement/schedule-interview/${selectedOpening}`,
          selectedRows
        )
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeStatus = async (status) => {
    try {
      const selectedRows = table
        .getSelectedRowModel()
        .rows.map((row) => row.original.id)
      if (selectedRows.length < 1) alert('Atleast select one employee')
      else {
        const res = await axiosInstance.put(
          `/benched-employee/change-status/${status}`,
          selectedRows
        )
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnboardProgress = async () => {
    try {
      const odata = table.getSelectedRowModel().rows.map((row) => ({
        id: row.original.client,
        empId: row.original.id,
      }))
      if (odata.length < 1) alert('Atleast select one employee')
      else {
        const res = await axiosInstance.put(
          '/project-requirement/onboarding-in-progress',
          odata
        )
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const isAnyRowSelected = table.getSelectedRowModel().rows.length > 0
  return (
    <div className='flex items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            className='ml-auto hidden h-8 lg:flex'
          >
            <MixerHorizontalIcon className='mr-2 h-4 w-4' />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[150px]'>
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== 'undefined' && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='capitalize'
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Add button that navigates to /add-employee */}
      <Button
        onClick={handleAddClick}
        variant='outline'
        size='sm'
        className='ml-2 h-8 border border-gray-800 bg-gray-800 text-white dark:border-white dark:bg-white dark:text-gray-800 lg:flex'
      >
        ADD
      </Button>

      {/* Change Status button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
          disabled={!isAnyRowSelected}
            // onClick={handleChangeStatusClick}
            variant='outline'
            size='sm'
            className='ml-2 h-8 border border-gray-800 bg-gray-800 text-white dark:border-white dark:bg-white dark:text-gray-800 lg:flex'
          >
            Change Status
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-h-[300px] sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Change Status</DialogTitle>
            <DialogDescription>
              Selected Employees status will change accordingly
            </DialogDescription>
          </DialogHeader>
          <div className='flex items-center space-x-2'>
            <div className='grid flex-1 gap-2'>
              <Label htmlFor='link' className='sr-only'>
                Openings
              </Label>
              <Select onValueChange={(value) => setSelectedOpening(value)}>
                <SelectTrigger className='w-[380px]'>
                  <SelectValue placeholder='Select Opening' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Openings</SelectLabel>
                    {data?.map((option) => (
                      <SelectItem value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <DialogClose asChild>
              <Button onClick={scheduleInterview} size='sm' className='px-3'>
                Submit
              </Button>
            </DialogClose>
          </div>
          <DialogFooter className='max-w-[480px] flex-wrap items-center space-y-2 sm:justify-start'>
            <DialogClose asChild>
              <Button
                type='button'
                variant='secondary'
                onClick={() => handleChangeStatus('RESIGNED')}
              >
                Resigned
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type='button'
                variant='secondary'
                onClick={() => handleChangeStatus('ON_MATERNITY')}
              >
                On Maternity
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type='button'
                variant='secondary'
                onClick={() => handleChangeStatus('UNDER_EVALUATION')}
              >
                Under Evaluation
              </Button>
            </DialogClose>
            <br />
            <DialogClose asChild>
              <Button
                type='button'
                variant='secondary'
                onClick={handleOnboardProgress}
              >
                OnBoarding In Progress
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type='button'
                variant='secondary'
                onClick={() => handleChangeStatus('ONBOARDED')}
              >
                OnBoarded
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
