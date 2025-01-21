import React from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
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
                    <h1 className='font-bold text-xl text-center text-teal-600 '>Welcome Back !</h1>

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
                                    type='radio' name='role' value='student' checked={input.role === 'student'} onChange={changeEventHandler} className='cursor-pointer'
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type='radio' name='role' value='recruiter' checked={input.role === 'recruiter'} onChange={changeEventHandler} className='cursor-pointer'
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>

                    </div>
                    <Button type='submit' className='w-full my-4 bg-teal-700'>Login</Button>
                    <span className='text-sm'>Not registered? <Link to='/signup' className='mx-4 text-violet-800'>Sign up</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login;