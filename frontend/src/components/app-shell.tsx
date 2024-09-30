import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from './sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import SkipToMain from './skip-to-main'
import { useSelector } from 'react-redux'

export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  const {isAuthenticated} = useSelector(state=>state);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  return (
    <div className='relative h-full overflow-hidden bg-background'>
      <SkipToMain />
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
      >
        <Outlet />
      </main>
    </div>
  )
}
