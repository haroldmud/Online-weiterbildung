"use client"

import Button from "../ui/Button";
import { useEffect, useRef, useState } from "react";
// import { useSession, signOut } from "next-auth/react";
import useStore from "@/zustand/store";
import { useRouter } from "next/navigation";

const Header =()=> {
  // const {data: session} = useSession();
  const menuRef = useRef(null); 
  const headerRef = useRef(null);
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const isLogged = useStore(state => state.isLogged);
  const isLoggedOut = useStore(state => state.signOut);
  const isLoogedIn = useStore(state => state.signinIn);
  const username = useStore(state => state.username);
  const setUsername = useStore(state => state.setUsername);
  const router = useRouter();

  const loggout = () => {
    isLoggedOut();
    router.push('/');
    // signOut();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
  
  // const featchUsername = async () => {
  //   const response = await fetch(`http://localhost:3000/api/users/${username}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'authorization': `Bearer ${localStorage.getItem('token')}`
  //     }
  //   })
  //   const data = await response.json();
  // }
  
  useEffect(() => {;
    if(localStorage.getItem('token')){
      isLoogedIn();
      setUsername(localStorage.getItem('username') || '');
      console.log(isLoogedIn())
    }
    const handleScroll = () => {
      if(window.scrollY < 600){
        setShow(true);
      }else{
        setShow(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  },[])

  return (
    <header className={`bg-black h-12 flex justify-center ${show && "sticky"} top-0 z-50`} ref={headerRef} >
      <div className="max-w-[1000px] w-full relative flex items-center">
        <div className="w-full absolute flex justify-end">
          {
            !isLogged ?
            <Button route="/auth/login" name="Se connecter"/>
            :
          <div className="w-32" ref={menuRef}>
            <button onClick={()=>setShowMenu(prev=>!prev)} className="bg-red-600 rounded-full w-8 h-8 mx-auto flex items-center justify-center text-sm hover:bg-red-500">
              <p className="font-bold">{username?.split('')[0].toLocaleUpperCase()}</p>
            </button>
            {showMenu && <div className="flex flex-col gap-4 items-center justify-between bg-white shadow-lg rounded-lg p-4 max-w-xs mx-auto z-50 absolute top-10 right-0">
              <span className="text-lg font-semibold">{username}</span>
              <button onClick={loggout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Logout
              </button>
            </div>}
          </div>
          }
        </div>
      </div>
    </header>
  );
}

export default Header;
