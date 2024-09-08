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

export default function page() {
  return (
    <div className="md:flex mb-5 flex-col mx-10 h-max">
      <DashNav />
      <h1 className="font-helvetica text-4xl md:text-6xl mb-6 mt-8">
        Dashboard
      </h1>
      <div className="flex flex-col">
        <div className="flex items-stretch mb-14">
          <PriceCard />
          <PriceIndex />
          <PriceIndex />
          <NewsCard />
        </div>
        <div className="flex">
          <PortfolioOverview />
          <HoldingsContainer />
        </div>
      </div>
    </div>
  );
}
