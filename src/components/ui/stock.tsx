"use client";
import React from "react";
import Link from "next/link";
import PriceCard from "../PriceCard";
import {useState, useEffect} from "react";
interface StockProps {
  name: string;
  symbol: string;
}

const Stock: React.FC<StockProps> = ({ name, symbol}) => {
  // const [quote, setQuote] = useState({price: 0, change: 0});

  // useEffect(() => {
  //   const fetchQuote = async () => {
  //     const res = await fetch(`/api/finnhub/${symbol}`)
  //     if (!res.ok) {
  //       console.log("Failed to fetch company data");
  //     }
  //     const data = await res.json();
  //     if (data.quote && typeof data.quote === 'object') {
  //       const { regularMarketPrice, regularMarketChange } = data.quote;
  //       setQuote({
  //         price: regularMarketPrice !== undefined ? regularMarketPrice : 0,
  //         change: regularMarketChange !== undefined ? regularMarketChange : 0,
  //       });
  //     } else {
  //       console.error("Quote data is missing or malformed:", data);
  //     }
  //   }

  //   fetchQuote();
  // }, [ symbol ]);
  return (
    <>
      <div className="flex justify-between my-10 mx-16">
        <Link href={`/company/${symbol}`}>
          <div className="flex flex-col">
            <h1 className="font-barlow">{name}</h1>
            <h1 className="font-barlow">{symbol}</h1>
          </div>
        </Link>
        {/* <div className="flex flex-col">
         {(quote.price !==0) ? (<h1 className="font-barlow text-right">{quote.price.toFixed(2)}</h1>) : <></>}
          {(quote.change !== 0) ? (<h1 className={`font-barlow text-right ${quote.change < 0 ? ` text-red-600` : `text-green-500`}`}>{quote.change.toFixed(2)}</h1>) : <></>}
        </div> */}
      </div>
      <hr className="border-t-2 border-gray-400  mt-auto mx-16" />
    </>
  );
};

export default Stock;
