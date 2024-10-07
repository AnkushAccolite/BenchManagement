import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function RecentSales() {
  return (
    <div className='space-y-8'>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/01.png' alt='Avatar' />
          <AvatarFallback>KK</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Khushi Kumar</p>
          <p className='text-sm text-muted-foreground'>
            7784
          </p>
        </div>
        <div className='ml-auto font-medium'>17</div>
      </div>
      <div className='flex items-center'>
        <Avatar className='flex h-9 w-9 items-center justify-center space-y-0 border'>
          <AvatarImage src='/avatars/02.png' alt='Avatar' />
          <AvatarFallback>AP</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Aroshi Pattanaik</p>
          <p className='text-sm text-muted-foreground'>8123</p>
        </div>
        <div className='ml-auto font-medium'>13</div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/03.png' alt='Avatar' />
          <AvatarFallback>RP</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Rishika Patil</p>
          <p className='text-sm text-muted-foreground'>
            INT-7584
          </p>
        </div>
        <div className='ml-auto font-medium'>11</div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/04.png' alt='Avatar' />
          <AvatarFallback>KA</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Kumar Ankush</p>
          <p className='text-sm text-muted-foreground'>INT-7123</p>
        </div>
        <div className='ml-auto font-medium'>10</div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/05.png' alt='Avatar' />
          <AvatarFallback>CA</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Chirag Arora</p>
          <p className='text-sm text-muted-foreground'>INT-1234</p>
        </div>
        <div className='ml-auto font-medium'>10</div>
      </div>
    </div>
  )
}
