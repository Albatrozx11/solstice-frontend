import React from "react";
interface PriceIndexProps {
  name: string;
  value: number;
  change: string;
}
export default function PriceIndex({ name, value, change } : PriceIndexProps) {
  return (
    <div className="rounded-md  shadow-black shadow-md border-black  w-1/6 h-full flex ml-5">
      <div className="flex flex-col m-2">
        <h1 className="font-barlow text-2xl text-black px-4 pt-2 opacity-80">
          {name}
        </h1>
        <div className="flex">
        <h1 className="font-barlow text-2xl px-4 pb-2 text-[#615D5D]">
          {value}
        </h1>
        <h1 className= {`font-barlow text-2xl px-4 pb-2 ${change.charAt(0) === '+' ? `text-[#009D10]` : `text-red-600`} `}>
          {change}
        </h1>
        </div>
      </div>
    </div>
  );
}
