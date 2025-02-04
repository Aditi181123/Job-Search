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
                <form onSubmit={submitHandler} className='w-1/2 p-6 rounded-md my-10 shadow-md shadow-gray-400'>
                    <h1 className='font-bold text-2xl text-center text-c1 '>Sign Up <span className='text-zinc-600'>Today to get Hired! </span></h1>
                    <div className='my-2'>
                        <Label className='font-bold'>Full Name</Label>
                        <Input
                            type='text'
                            value={input.fullname}
                            name='fullname'
                            onChange={changeEventHandler}
                            placeholder='Enter your full name'
                        />
                    </div>
                    <div className='my-2'>
                        <Label className='font-bold'>Phone no.</Label>
                        <Input
                            type='number'
                            value={input.phoneNumber}
                            name='phoneNumber'
                            onChange={changeEventHandler}
                            placeholder='Enter your Phone No.'
                        />
                    </div>

                    <div className='my-2'>
                        <Label className='font-bold'>Email Address</Label>
                        <Input
                            type='email'
                            value={input.email}
                            name='email'
                            onChange={changeEventHandler}
                            placeholder='Enter your Email'
                        />
                    </div>

                    <div className='my-2'>
                        <Label className='font-bold'>Password</Label>
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
                                <Label htmlFor="r1" className='font-bold'>Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type='radio' name='role' value='recruiter' checked={input.role==='recruiter'} onChange={changeEventHandler} className='cursor-pointer'
                                />
                                <Label htmlFor="r2" className='font-bold'>Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex px-4 item-center gap-2 '>
                            <Label className=' px-3 py-1.5 font-bold'>Profile</Label>
                            <Input 
                                accept='image/*' type='file' onChange={changeFileHandler} className='cursor-pointer'
                            />

                        </div>

                    </div>
                    <Button type='submit'className='w-full my-4 bg-c1 hover:bg-c2'>SIGN UP</Button>
                    <span className='text-sm'>Already registered? <Link to='/login' className='mx-4 text-c2'> Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup;