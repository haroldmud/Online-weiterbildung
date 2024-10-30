"use client"
import { useState } from 'react';
import { IoEyeOffOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const fetchSignUp = async (username: string, email:string, password: string) => {
    try{
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({username, email, password}),
      })
      if (!response.ok) {
        console.error('Something went wrong, status:', response.status);
        return;
      }
      const data = await response.json();
      console.log(data)
      return data;
    }catch(e){
      console.error('Error:', e);
    }
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    (password !== confirmPassword) ? setPasswordMatchError(true) : setPasswordMatchError(false);
    try{
      fetchSignUp(username, email, password);
      const router = useRouter();
      router.push('/auth/login');
    } catch(e){
      console.error('Error:', e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <a href="/" className="text-4xl font-bold absolute top-4 left-4 flex" title="Go back">
          <IoIosArrowRoundBack />
        </a>
      <div className="w-full max-w-md bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black`}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 p-2 w-full border ${passwordMatchError ? "border-red-500" :"border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-black`}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaRegEye /> : <IoEyeOffOutline />}
              </button>
            </div>
            {passwordMatchError && <p className='text-sm italic text-red-500 font-thin'>unmatched passwords</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`mt-1 p-2 w-full border ${passwordMatchError ? "border-red-500": "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-black`}
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <FaRegEye /> : <IoEyeOffOutline />}
              </button>
            </div>
            {passwordMatchError && <p className='text-sm italic text-red-500 font-thin'>unmatched passwords</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <a href="/auth/login" className="text-red-500 hover:underline">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
}
