import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import ModalWatchlist from "../ui/ModalWatchlist";

export default function WatchlistNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState("");

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();
  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      // redirect to login page
      alert("You need to login first");
      router.push("/login");
    }
  }, []);

  const handleCreateWatchlist = async (watchlistName: string) => {
    if (!token) {
      alert("You need to login first");
      router.push("/login");
    }

    try {
      const response = await fetch("http://localhost:8000/create-watchlist/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          name: watchlistName,
          description: `watchlist created for${token.substring(0,30)}`,
        }),
      });

      if (response.ok) {
        localStorage.setItem("watchlist", watchlistName);
        console.log("Watchlist created successfully");
        alert("Watchlist created successfully");
      } else {
        console.error("Failed to create watchlist");
      }
    } catch (error) {
      console.error("Error creating watchlist:", error);
    }
  };

  return (
    <>
      <nav className="flex flex-col justify-center h-auto">
        <div className="my-4 flex items-center justify-between">
          <ul className="hidden md:flex gap-6 list-none font-barlow cursor-pointer">
            <Link href="/dashboard">
              <li>Overview</li>
            </Link>
            <Link href="/watchlist">
              <li>Watchlist</li>
            </Link>
            <Link href="/companyList">
              <li>Stocks</li>
            </Link>
            <Link href="/transactions">
            <li>Transactions</li>
            </Link>
          </ul>
          <div className="hidden md:flex items-center gap-6 font-barlow font-bold">
            <button
              className="border-2 border-black px-6 py-3 font-bold"
              onClick={() => setShowModal(true)}
            >
              Create Watchlist
            </button>
            <ModalWatchlist
              show={showModal}
              onClose={() => setShowModal(false)}
              onSubmit={handleCreateWatchlist}
            />
            <div className="rounded-full">
              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                width={40}
                height={40}
                className="rounded-full"
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
  );
}
