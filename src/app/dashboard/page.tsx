"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashNav from "@/components/structure/DashNav";
import PriceCard from "@/components/PriceCard";
import PriceIndex from "@/components/PriceIndex";
import NewsCard from "@/components/NewsCard";
import PortfolioOverview from "@/components/PortfolioOverview";
import HoldingsContainer from "@/components/HoldingsContainer";
import { isAuthenticated } from "@/lib/utils";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
interface Holding {
  portfolio: {
    user: number;
    portfolio_name: string;
  };
  company: {
    name: string;
    ticker: string;
  };
  transction_type: string;
  quantity: number;
  price: string;
  date: string;
}
export default function page() {
  const [holdingsData, setHoldingsData] = useState < Holding[]>([]);
  const indexFunds = [{name:"NASDAQ", value: 18057.84, change:"+0.75"}, {name:"BSE SENSEX", value: 81688.45,change: "-0.98"}];
  // Calculate total and current values
  let totalValue = 0;
  let currentValue = 0;
  
  holdingsData.forEach((holding) => {
    const purchasePrice = parseFloat(holding.price);
    const quantity = holding.quantity;
    const marketPrice = purchasePrice / quantity;

    totalValue += purchasePrice * quantity; // Total value based on purchase price
    currentValue += marketPrice * quantity; // Current value based on market price
  });

  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login"); // Redirect if not authenticated
    }
  }, [router]);
  return (
    <div className="md:flex mb-5 flex-col mx-10 h-max">
      <DashNav />
      <h1 className="font-helvetica text-4xl md:text-6xl mb-6 mt-8">
        Dashboard
      </h1>
      <div className="flex flex-col">
        <div className="flex items-stretch mb-14">
          <PriceCard totalValue={totalValue} currentValue={currentValue}/>
          {indexFunds.map((fund,index) => (
                      <PriceIndex key={index} name={fund.name} value={fund.value} change={fund.change}/>
          ))}

          <NewsCard />
        </div>
        <div className="flex">
          <PortfolioOverview />
          <HoldingsContainer setHoldingsData={setHoldingsData} />
        </div>
      </div>
    </div>
  );
}
