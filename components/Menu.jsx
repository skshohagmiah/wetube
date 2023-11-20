'use client';
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import MobileNavbar from "./MobileNavbar";

const Menu = () => {
    const [open , setOpen ] = useState(true);
    const handleClick = () => {
        console.log('click')
        setOpen(!open)
    }

  return (
    <>
    <div onClick={handleClick}>
        <FaBars  size={30}/>
    </div>
      <div>
      {open ? (
            <MobileNavbar />
        ):''}
      </div>
     </>
  )
}

export default Menu