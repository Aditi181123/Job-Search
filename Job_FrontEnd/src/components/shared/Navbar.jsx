import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'

const Navbar = () => {
    const user = false
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between h-16 mx-auto max-w-7xl'>
                <div className='flex items-center gap-3 '>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 text-c1">
                        <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                        <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
                    </svg>


                    <h1 className='text-3xl font-bold text-c1'>Jobify<span className='text-gray-800'>.com</span></h1>
                </div>
                <div className='flex item-center gap-12'>
                    <ul className='flex font-medium item-center gap-8 text-gray-700 cursor-pointer'>
                        <li>
                        <Link to="/">Home</Link>
                        </li>
                        <li>
                        <Link to="/jobs">Jobs</Link>
                        </li>
                        <li>
                        <Link to="/post-job">Post a Job</Link>
                        </li>
                    </ul>
                    {
                        !user ? (
                            <div className='flex item-center gap-3'>
                                <Link to='/login'>
                                    <Button variant='outline' className='bg-c1 text-white px-6 cursor-pointer hover:text-white hover:bg-c2' >Login</Button>
                                </Link>
                                <Link to='/signup'>
                                    <Button variant='outline' className='bg-c1 text-white cursor-pointer hover:text-white hover:bg-c2'  >Sign up</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />

                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-90 bg-c2'>
                                    <div className='flex gap-4 space-y-1'>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />

                                        </Avatar>
                                        <div>
                                            <h3 className='font-medium text-white'>New User</h3>
                                            <p className='text-sm text-muted-foreground text-white'>Joined 2024</p>
                                        </div>

                                    </div>
                                    <div className='flex flex-col my-2'>
                                        <div className='flex cursor-pointer item-center gap-2 text-white'>
                                            <User2 />
                                            <Button variant='link' className='text-white'>View Profile</Button>
                                        </div>
                                        <div className='flex cursor-pointer item-center gap-2 text-white'>
                                            <LogOut />
                                            <Button variant='link' className='text-white' >Log Out</Button>

                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>


        </div>
    )
}

export default Navbar