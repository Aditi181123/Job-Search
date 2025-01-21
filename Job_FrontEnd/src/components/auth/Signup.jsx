import React from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {

    const [input,setInput]=useState({
        fullname:"",
        phoneNumber:"",
        email:"",
        password:"",
        role:"",
        file:""

    });

    const changeEventHandler =(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }

    const changeFileHandler = (e) =>{
        setInput({...input,file:e.target.files?.[0]});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input);
    }

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-6xl mx-auto my-10">
                <form onSubmit={submitHandler} className='w-1/2 border border-teal-500 p-6 rounded-md my-10'>
                    <h1 className='font-bold text-xl text-center text-teal-600 '>Sign Up <span className='text-zinc-600'>Today to get Hired! </span></h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input
                            type='text'
                            value={input.fullname}
                            name='fullname'
                            onChange={changeEventHandler}
                            placeholder='Enter your full name'
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Phone no.</Label>
                        <Input
                            type='number'
                            value={input.phoneNumber}
                            name='phoneNumber'
                            onChange={changeEventHandler}
                            placeholder='Enter your Phone No.'
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Email Address</Label>
                        <Input
                            type='email'
                            value={input.email}
                            name='email'
                            onChange={changeEventHandler}
                            placeholder='Enter your Email'
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type='password'
                            value={input.password}
                            name='password'
                            onChange={changeEventHandler}
                            placeholder='Enter the password'
                        />
                    </div>
                    <div className='my-2 flex item-center justify-between'>
                        <RadioGroup className='flex item-center gap-3'>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type='radio' name='role' value='student' checked={input.role==='student'} onChange={changeEventHandler} className='cursor-pointer'
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type='radio' name='role' value='recruiter' checked={input.role==='recruiter'} onChange={changeEventHandler} className='cursor-pointer'
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex item-center gap-4 '>
                            <Label>Profile</Label>
                            <Input 
                                accept='image/*' type='file' onChange={changeFileHandler} className='cursor-pointer'
                            />

                        </div>

                    </div>
                    <Button type='submit'className='w-full my-4 bg-teal-700'>Sign UP</Button>
                    <span className='text-sm'>Already registered? <Link to='/login' className='mx-4 text-violet-800'> Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup;