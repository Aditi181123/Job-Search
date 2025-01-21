import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'

const Navbar = () => {
    const user = false
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between h-16 mx-auto max-w-7xl'>
                <div>
                    <h1 className='text-3xl font-bold text-teal-600'>Jobify<span className='text-stone-600'>.com</span></h1>
                </div>
                <div className='flex item-center gap-12'>
                    <ul className='flex font-medium item-center gap-5 text-zinc-600 cursor-pointer'>
                        <li>Home</li>
                        <li>Jobs</li>
                        <li>Browse</li>
                    </ul>
                    {
                        !user ? (
                            <div className='flex item-center gap-3'>
                                <Link to='/login'> 
                                    <Button variant='outline' className='bg-teal-600 text-white cursor-pointer hover:text-teal-600' >Login</Button>
                                </Link>
                                <Link to='/signup'>
                                    <Button variant='outline' className='text-teal-600 text-center cursor-pointer' >Sign up</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />

                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-90'>
                                    <div className='flex gap-4 space-y-1'>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />

                                        </Avatar>
                                        <div>
                                            <h3 className='font-medium'>New User</h3>
                                            <p className='text-sm text-muted-foreground'>Joined 2024</p>
                                        </div>

                                    </div>
                                    <div className='flex flex-col my-2'>
                                        <div className='flex cursor-pointer item-center gap-2'>
                                            <User2 />
                                            <Button variant='link'>View Profile</Button>
                                        </div>
                                        <div className='flex cursor-pointer item-center gap-2'>
                                            <LogOut />
                                            <Button variant='link'>Log Out</Button>

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