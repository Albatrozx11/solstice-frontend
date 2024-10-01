"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/lib/utils";
import WatchlistNav from "@/components/structure/WatchlistNav";
export default function page() {
  const router = useRouter();
  const [isWatchlist, setIsWatchlist] = useState(false);
  useEffect(() => {
    const storedToken = localStorage.getItem("watchlist");
    if (storedToken == "created") {
      setIsWatchlist(true);
    }
  }, []);

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
          <div></div>
        )}
      </div>
    </div>
  );
}
