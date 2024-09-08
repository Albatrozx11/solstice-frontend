import React from "react";
import { Linechart } from "./Linechart";
export default function PortfolioOverview() {
  return (
    <div className="rounded-md shadow-black shadow-md border-black w-3/5 h-[60vh]">
      <h1 className="font-barlow text-2xl text-black opacity-80 px-5 mx-5 my-6">
        Portfolio Overview
      </h1>
      <Linechart  />
    </div>
  );
}
