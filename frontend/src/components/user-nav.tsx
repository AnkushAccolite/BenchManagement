import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/custom/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

export function UserNav() {
  const userName = 'User'; // Replace with the actual user's name
  const initials = getInitials(userName);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src='/avatars/01.png' alt='@shadcn' />
            <AvatarFallback>{initials || '-'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{userName}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              user@accolitedigital.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Software Engineer
            <DropdownMenuShortcut>B7</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>TBD-AU</DropdownMenuItem>
          <DropdownMenuItem>7784</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
