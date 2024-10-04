import {
  IconBriefcase,
  IconLayoutDashboard,
  IconSettings,
  IconBook,
  IconNotebook,
  
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
    title: 'Openings',
    label: '',
    href: '/openings',
    icon: <IconBriefcase size={18} />,
  },
  {
    title: 'Projects',
    label: '',
    href: '/projects',
    icon: <IconNotebook size={18} />,
  },
  {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
]
