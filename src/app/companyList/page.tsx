"use client";
import React, { useState, useEffect, useCallback } from "react";
import CompanyNav from "@/components/structure/CompanyNav";
import Stock from "@/components/ui/stock";

const ITEMS_PER_PAGE = 10;

export default function Page() {
  const [stocks, setStocks] = useState<any[]>([]); // Array of stocks
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0); // Current offset for pagination

  const API_URL_stock = `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=crpe8j1r01qsek0fj8pgcrpe8j1r01qsek0fj8q0`;

  const fetchStocks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL_stock}&offset=${offset}`);
      if (!res.ok) {
        throw new Error("Failed to fetch company data");
      }
      const data = await res.json();
      
      // Update stocks state by appending new stocks
      setStocks((prevStocks) => [...prevStocks, ...data.slice(offset, offset + ITEMS_PER_PAGE)]);
      
      // Increment offset for the next batch
      setOffset((prevOffset) => prevOffset + ITEMS_PER_PAGE);
    } catch (error) {
      console.error("Error fetching company data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = useCallback(() => {
    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200; // Trigger when near bottom
    if (bottom && !isLoading) {
      fetchStocks();
    }
  }, [isLoading]);

  useEffect(() => {
    // Fetch initial stocks
    fetchStocks();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Cleanup listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex flex-col mx-10 h-max">
      <CompanyNav />
      <div className="flex flex-col">
        {stocks.length > 0 ? (
          stocks.map((stock: any, index: number) => (
            <Stock
              key={index}
              name={stock.description}
              symbol={stock.symbol}
            />
          ))
        ) : (
          <p>No stocks available.</p>
        )}
        {isLoading && <p>Loading more stocks...</p>} {/* Show loading indicator */}
      </div>
    </div>
  );
}
