"use client"
import { useState } from 'react';
import { IoEyeOffOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = async (e:  { preventDefault: () => void; }) => {
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      if (!response.ok) {
        console.error('Something went wrong, status:', response.status);
        return;
      }
      const data =  await response.json();
      localStorage.setItem('token', data.accessToken);
    }catch(e){
      console.error('Error:', e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <a href="/" className="text-4xl font-bold absolute top-4 left-4 flex" title="Go back">
          <IoIosArrowRoundBack />
        </a>
      <div className="w-full max-w-md bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="text" className="block text-sm font-medium text-gray-500">
              Username
            </label>
            <input
              id="email"
              type="text"
              placeholder='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-500">
              Password
            </label>
            <div className='relative'>
              <input
                id="password"
                type={`${showPassword? "text": "password"}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
                required
              />
              <button onClick={togglePasswordVisibility} className='absolute right-3 top-[35%]'>
                {showPassword ? <IoEyeOffOutline /> : <FaRegEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
                Don't have an account?{' '}<a href="/auth/signup" className="text-red-500 hover:underline">Sign up here</a>.
        </p>
      </div>
      
    </div>
  );
}

