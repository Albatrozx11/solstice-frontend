import React,{useState} from 'react'
import Link from 'next/link'
import { Menu, X } from "lucide-react";
export default function DashNav() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    };
  return (
    <>
    <nav className="flex flex-col justify-center h-auto">
    <div className="my-4 flex items-center justify-between">
      <ul className="hidden md:flex gap-6 list-none font-barlow cursor-pointer">
        <Link href="/dashboard">
          <li>Overview</li>
        </Link>
        <li>Watchlist</li>
        <li>Support</li>
        <li>About Us</li>
      </ul>
      <div className="hidden md:flex items-center gap-6 font-barlow font-bold">
        <div className="rounded-full">
          <img
            src="https://avatar.iran.liara.run/public/32"
            alt="profile"
            width={40}
            height={40}
          ></img>
        </div>
      </div>
      <div className="md:hidden">
        <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
      </div>
    </div>
    <hr className="border-t-2 border-gray-400 w-full mt-auto" />
  </nav>
  {isOpen && (
    <div className="flex flex-col items-center justify-center z[20]">
      <ul className="flex flex-col gap-6 list-none font-barlow cursor-pointer mt-5 items-center">
        <Link href="/">
          <li>Home</li>
        </Link>
        <li>Pricing</li>
        <li>Support</li>
        <li>About Us</li>
      </ul>
      <div className="flex flex-col items-center gap-6 font-barlow font-bold mt-5">
        <Link href="/login">
          <span>Log In</span>
        </Link>
        <Link href="/signup">
          <button className="border-2 border-black px-6 py-3 font-bold">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
    
  )}
  </>
  )
}
