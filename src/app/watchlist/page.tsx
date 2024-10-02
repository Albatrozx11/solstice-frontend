"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/lib/utils";
import WatchlistNav from "@/components/structure/WatchlistNav";
import Link from "next/link";
export default function page() {
  const router = useRouter();
  const [isWatchlist, setIsWatchlist] = useState(false);

  const [token, setToken] = useState<String>();
  const [watchlistName, setWatchlistName] = useState<String>();
  const [watchlistStocks, setWatchlistStocks] = useState<any[]>([]);
  useEffect(() => {
    const checkWatchlist = localStorage.getItem("watchlist");
    if (checkWatchlist) {
      setIsWatchlist(true);
      setWatchlistName(checkWatchlist)
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!token) return;
        try {
          const response = await fetch("http://localhost:8000/watchlist/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setWatchlistStocks(data);
          }
        } catch (error) {
          console.log("Error fetching watchlist", error);
        }
    };

    if (token) {
      fetchWatchlist(); // Only fetch when the token is available
    }
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login"); // Redirect if not authenticated
    }
  }, [router]);
  return (
    <div className="flex flex-col mx-10 h-max">
      <WatchlistNav />
      <div className="flex flex-col">
        {!isWatchlist ? (
          <h1 className="font-barlow text-xl text-black opacity-80  my-6 ">
            Create a Watchlist to view your watchlisted stocks
          </h1>
        ) : (
          <div>
            <h1 className="font-barlow text-xl my-4">Your Watchlist:</h1>
            {watchlistStocks.length > 0 ? (
              <div className="flex flex-col">
                {watchlistStocks.map((stock) => (
                  <>
                  <div key={stock.company.ticker} className="flex justify-between my-4 ">
                    <Link href={`/company/${stock.company.ticker}`}>
                      <div className="flex flex-col">
                        <h1 className="font-barlow">{stock.company.name}</h1>
                        <h1 className="font-barlow">{stock.company.ticker}</h1>
                      </div>
                    </Link>
                    
                  </div>
                  <hr className="border-t-2 border-gray-400 my-6 " />
                  </>
                ))}
              </div>
            ) : (
              <p>No stocks in watchlist.</p>
            )}
            
          </div>
        )}
      </div>
    </div>
  );
}
