import {
  IconBriefcase,
  IconLayoutDashboard,
  IconBook,
  IconNotebook,
  IconClipboardCheck,
  
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Bench Records',
    label: '',
    href: '/tasks',
    icon: <IconBook size={18} />,
  },
  {
    title: 'Projects',
    label: '',
    href: '/projects',
    icon: <IconNotebook size={18} />,
  },
  {
    title: 'Job Openings',
     label: '',
     href: '/openings',
     icon: <IconBriefcase size={18} />,
   },
  {
    title: 'Scheduler',
    label: '',
    href: '/raft',
    icon: <IconClipboardCheck size={18} />,
  },
 
  
]
