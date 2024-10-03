import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/custom/button';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/authActions'
import { useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'


export function UserNav() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore-
  const { userId, empId, email, name, role, accessToken, refreshToken } =
    useSelector((state) => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  function getInitials(name: string) {
  const names = name.trim().split(' ');

  if (names.length === 0) return '';

  const firstInitial = names[0].charAt(0).toUpperCase();

  if (names.length === 1) {
    return firstInitial;
  }

  const lastInitial = names[names.length - 1].charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
}

  const logOut = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const data = { userId, empId, email, name, role, accessToken, refreshToken }
    // await dispatch(logout(data))
    localStorage.clear()
    navigate(0)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src='/avatars/01.png' alt='@shadcn' />

            <AvatarFallback>{getInitials(name) || '-'}</AvatarFallback>

          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>

            <p className='text-sm font-medium leading-none'>{name}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {email}

            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className='font-normal'>
          <div>
            <p className='text-sm leading-none'>{role}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button onClick={logOut}>Log out</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
