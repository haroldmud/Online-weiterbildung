"use client"

import Button from "../ui/Button";
import { useEffect, useState } from "react";


const Header =()=> {
  const [show, setShow] = useState(false);

  useEffect(() => {
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
    <header className={`bg-black h-12 flex justify-center ${show && "sticky"}  top-0 z-50`} >
      <div className="max-w-[1000px] w-full relative flex items-center">
        <div className="w-full absolute flex justify-end">
          <Button name="Se connecter"/>
        </div>
      </div>
    </header>
  );
}

export default Header;