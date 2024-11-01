"use client"

import Button from "../ui/Button";
import { useEffect, useRef, useState } from "react";
import useStore from "@/zustand/store";
import { useRouter } from "next/navigation";

const Header =()=> {
  const menuRef = useRef(null); 
  const headerRef = useRef(null);
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const isLogged = useStore(state => state.isLogged);
  const isLoggedOut = useStore(state => state.signOut);
  const isLoogedIn = useStore(state => state.signinIn);
  const router = useRouter();

  const loggout = () => {
    isLoggedOut();
    router.push('/');
    localStorage.removeItem('token');
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      isLoogedIn();
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
              <p className="font-bold">H</p>
            </button>
            {showMenu && <div className="flex flex-col gap-4 items-center justify-between bg-white shadow-lg rounded-lg p-4 max-w-xs mx-auto z-50 absolute top-10 right-0">
              <span className="text-lg font-semibold">Username</span>
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
