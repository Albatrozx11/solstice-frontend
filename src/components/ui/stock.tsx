"use client";
import React from "react";
import Link from "next/link";
interface StockProps {
  name: string;
  symbol: string;
}

const Stock: React.FC<StockProps> = ({ name, symbol }) => {
  return (
    <>
      <div className="flex justify-between my-10 mx-16">
        <Link href={`/company/${symbol}`}>
          <div className="flex flex-col">
            <h1>{name}</h1>
            <h1>{symbol}</h1>
          </div>
        </Link>
      </div>
      <hr className="border-t-2 border-gray-400  mt-auto mx-16" />
    </>
  );
};

export default Stock;
