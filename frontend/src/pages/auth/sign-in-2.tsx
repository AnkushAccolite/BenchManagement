import { Card } from '@/components/ui/card'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn2() {
  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
          <div className='mb-4 flex items-center justify-center'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlnsSvgjs="http://svgjs.com/svgjs"
            width="24"
            height="24"
            viewBox="0 0 64 64"
            className="mr-2 h-6 w-6"
          >
            <g id="Human_resource">
              <path d="M61.4675,56.6689,54.5176,49.6a14.4038,14.4038,0,1,0-4.4944,4.2737L57.0869,61.05a3.0976,3.0976,0,0,0,4.3806-4.3806ZM42.5837,49.0036a7.4186,7.4186,0,1,1,7.4186-7.4187A7.4187,7.4187,0,0,1,42.5837,49.0036Z" />
              <path d="M30.5071,29.5085a17.1433,17.1433,0,0,1,3.5215-2.6917,15.5874,15.5874,0,0,0-7.2254-5.987,1.5637,1.5637,0,0,1-.9455-1.4365v0a1.5948,1.5948,0,0,1,.4952-1.1693c.0966-.0921.1891-.1828.2584-.2558A9.772,9.772,0,0,0,27.9,16.2758,9.7238,9.7238,0,0,0,17.7283,1.727a9.5016,9.5016,0,0,0-7.6694,7.45A9.7235,9.7235,0,0,0,12.74,18.2034a1.6488,1.6488,0,0,1,.5144,1.1711v.0081a1.5651,1.5651,0,0,1-.9455,1.4516A16.0027,16.0027,0,0,0,3.7049,29.36a20.3589,20.3589,0,0,0-1.6967,8.3847v2.0785A3.3919,3.3919,0,0,0,5.4,43.2155H25.59A17.0511,17.0511,0,0,1,30.5071,29.5085ZM23.654,15.0522a5.4984,5.4984,0,0,1-3.92,1.7549,6.1972,6.1972,0,0,1-4.1474-1.7549,1.25,1.25,0,0,1,1.75-1.7857,3.0988,3.0988,0,0,0,4.5634.0044,1.25,1.25,0,1,1,1.7539,1.7813Z" />
            </g>
            {/* <style>
              {`@media (prefers-color-scheme: light) { 
                :root { filter: contrast(1) brightness(0.8); } 
              }`}
            </style> */}
          </svg>
            <h1 className='text-xl font-medium'>Bench Management</h1>
          </div>
          <Card className='p-6'>
            <div className='flex flex-col space-y-2 text-left'>
              {/* <h1 className='text-2xl font-semibold tracking-tight'>Login</h1> */}
              <p className='text-sm text-muted-foreground'>
                Enter your email and password below <br />
                to log into your account
              </p>
            </div>
            <UserAuthForm />
            <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
              By clicking login, you agree to our{' '}
              <a
                href='/terms'
                className='underline underline-offset-4 hover:text-primary'
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href='/privacy'
                className='underline underline-offset-4 hover:text-primary'
              >
                Privacy Policy
              </a>
              .
            </p>
          </Card>
        </div>
      </div>
    </>
  )
}
