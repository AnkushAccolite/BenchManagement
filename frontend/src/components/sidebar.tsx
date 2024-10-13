import { useEffect, useState } from 'react'
import { IconChevronsLeft, IconMenu2, IconX } from '@tabler/icons-react'
import { Layout } from './custom/layout'
import { Button } from './custom/button'
import Nav from './nav'
import { cn } from '@/lib/utils'
import { sidelinks } from '@/data/sidelinks'

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false)

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [navOpened])

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? 'md:w-14' : 'md:w-60'}`,
        className
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'} w-full bg-black md:hidden`}
      />

      <Layout fixed className={navOpened ? 'h-svh' : ''}>
        {/* Header */}
        <Layout.Header
          sticky
          className='z-50 flex justify-between px-4 py-3 shadow-sm md:px-4'
        >
          <div className={`flex items-center ${!isCollapsed ? 'gap-2' : ''}`}>
            {/* Inline SVG logo */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isCollapsed ? '24px' : '28px', // Match SVG width
                height: isCollapsed ? '24px' : '32px', // Match SVG height
                backgroundColor: 'white', // Set background color
                borderRadius: '4px', // Optional: round the corners
                padding: '4px', // Optional: add padding
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                version='1.1'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                // xmlnsSvgjs='http://svgjs.com/svgjs'
                width={isCollapsed ? '24' : '28'}
                height={isCollapsed ? '24' : '32'}
                viewBox='0 0 64 64'
                className='transition-all'
              >
                <g id='Human_resource'>
                  <path d='M61.4675,56.6689,54.5176,49.6a14.4038,14.4038,0,1,0-4.4944,4.2737L57.0869,61.05a3.0976,3.0976,0,0,0,4.3806-4.3806ZM42.5837,49.0036a7.4186,7.4186,0,1,1,7.4186-7.4187A7.4187,7.4187,0,0,1,42.5837,49.0036Z' />
                  <path d='M30.5071,29.5085a17.1433,17.1433,0,0,1,3.5215-2.6917,15.5874,15.5874,0,0,0-7.2254-5.987,1.5637,1.5637,0,0,1-.9455-1.4365v0a1.5948,1.5948,0,0,1,.4952-1.1693c.0966-.0921.1891-.1828.2584-.2558A9.772,9.772,0,0,0,27.9,16.2758,9.7238,9.7238,0,0,0,17.7283,1.727a9.5016,9.5016,0,0,0-7.6694,7.45A9.7235,9.7235,0,0,0,12.74,18.2034a1.6488,1.6488,0,0,1,.5144,1.1711v.0081a1.5651,1.5651,0,0,1-.9455,1.4516A16.0027,16.0027,0,0,0,3.7049,29.36a20.3589,20.3589,0,0,0-1.6967,8.3847v2.0785A3.3919,3.3919,0,0,0,5.4,43.2155H25.59A17.0511,17.0511,0,0,1,30.5071,29.5085ZM23.654,15.0522a5.4984,5.4984,0,0,1-3.92,1.7549,6.1972,6.1972,0,0,1-4.1474-1.7549,1.25,1.25,0,0,1,1.75-1.7857,3.0988,3.0988,0,0,0,4.5634.0044,1.25,1.25,0,1,1,1.7539,1.7813Z' />
                </g>
              </svg>
            </div>

            <div
              className={`flex flex-col justify-end truncate ${isCollapsed ? 'invisible w-0' : 'visible w-auto'}`}
            >
              <span className='font-medium'>BenchQ</span>
              <span className='text-xs'>Maximize Downtime</span>
            </div>
          </div>

          {/* Toggle Button in mobile */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            aria-label='Toggle Navigation'
            aria-controls='sidebar-menu'
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <IconX /> : <IconMenu2 />}
          </Button>
        </Layout.Header>

        {/* Navigation links */}
        <Nav
          id='sidebar-menu'
          className={`z-40 h-full flex-1 overflow-auto ${navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'}`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={sidelinks}
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size='icon'
          variant='outline'
          className='absolute -right-5 top-1/2 z-50 hidden rounded-full md:inline-flex'
        >
          <IconChevronsLeft
            stroke={1.5}
            className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </Button>
      </Layout>
    </aside>
  )
}
