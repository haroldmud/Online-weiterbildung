"use client"
import { useEffect, useState } from 'react';
import { IoEyeOffOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { generateIdentifier } from '@/helpers/identifier';
import { registerUser } from '@/actions/auth-actions';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passTester, setPassTester] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCondition, setPasswordCondition] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const hasDigit = /(?=.*\d)/;
  const [digit, setDigit] = useState(false);
  const hasLowercase = /(?=.*[a-z])/;
  const [lowercase, setLowercase] = useState(false);
  const hasUppercase = /(?=.*[A-Z])/;
  const [uppercase, setUppercase] = useState(false);
  const minLength = /.{8,}/;     
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const [length, setLength] = useState(false);
  const [passRequirements, setPassRequirements] = useState(false);
  const router = useRouter();

  const fetchSignUp = async (id: string, username: string, email:string, password: string) => {
    try {
        if(!passwordRegex.test(passTester)) {
          setPassRequirements(true);
          return;
        }

        const response = await registerUser({ id, username, email, password });
        if (!response.ok) {
          console.error('Something went wrong, status:', response.status);
          setError(true)
          return;
        }
        const data = await response.json();
        router.push('/auth/login');
        console.log("everything was successful", data);
        return data;
    } catch (e) {
        console.error('Error:', e);
      }
  }

  useEffect(() => {
    if(error){
     setTimeout(() => {
        setError(false)
      }, 5000);
    }
    return () => clearTimeout(setTimeout(() => {
      setError(false)
    }, 5000));
  },[error])

  const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    const value = e.target.value;
    setPassTester(value);
  
    setDigit(hasDigit.test(value as string));
    setLowercase(hasLowercase.test(value as string));
    setUppercase(hasUppercase.test(value as string));
    setLength(minLength.test(value as string));

    setPasswordCondition(!passwordRegex.test(value as string) && value !== '');
  };

  const handleSubmit = async(e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try{
      if( passTester === confirmPassword){
        console.log('Conditions met, sending request');
        await fetchSignUp(generateIdentifier(), username, email, passTester)
      }else {
        setPasswordError(true);
        console.log('Passwords do not match or do not met the requirements');
        return;
      }
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
        {error && <p className="text-red-500 text-xs italic">This user alredy exists, please try again!</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder='john_doe'
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
              placeholder='joedoe@myemail.com'
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
                id="password1"
                placeholder='password'
                type={showPassword ? "text" : "password"}
                value={passTester}
                onChange={(e) => handlePasswordChange(e)}
                className={`mt-1 p-2 w-full border ${passwordError ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-black`}
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
            <p className={`text-xs italic ${!digit ? 'text-red-500' : !lowercase ? 'text-orange-500' : !uppercase ? 'text-blue-500' : !length ? 'text-green-500' : 'text-black'}`}>
              { 
                passTester === '' ? '' :
                !digit ? 'At least one digit required' :
                !lowercase ? 'At least one lowercase letter required' :
                !uppercase ? 'At least one uppercase letter required' :
                !length ? 'At least 8 characters required' :
                ''
              }
            </p>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="password2"
                placeholder='confirm password'
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`mt-1 p-2 w-full border ${passwordError ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-black`}
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
            {passwordError ? <p className="text-red-500 text-xs italic">Passwords do not match</p> : confirmPassword === '' ? '' : passRequirements  ? <p className="text-red-500 text-xs italic">Password does not meet the requirements</p> : ''}
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
