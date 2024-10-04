import React from "react";
interface PriceCardProps {
  totalValue: number;
  currentValue: number;
}
export default function PriceCard({
  totalValue,
  currentValue,
}: PriceCardProps) {
  const returns = currentValue - totalValue;
  return (
    <div className="rounded-md shadow-black shadow-md border-black  w-1/4 h-full flex justify-between">
      <div className="flex flex-col m-2">
        <h1 className="font-barlow text-2xl text-[#009D10] px-4 pt-2">
          ${totalValue.toFixed(2)}
        </h1>
        <h1 className="font-barlow text-2xl px-4 pb-2 text-[#615D5D]">
          Total Value
        </h1>
      </div>
      <div>
        <div className="flex flex-col m-2">
          <h1 className="font-barlow text-2xl text-[#009D10] px-4 pt-2 text-right">
            ${currentValue.toFixed(2)}
          </h1>
          <h1 className="font-barlow text-2xl px-4 pb-2 text-[#615D5D]">
            Current Value
          </h1>
        </div>
      </div>
    </div>
  );
}
