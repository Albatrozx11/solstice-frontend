import React from "react";
export default function Holdings() {
  return (
    <>
      <div className="flex justify-between px-2 my-4 mx-4 items-center">
        <div className="flex flex-col">
          <h1 className="text-black opacity-80">AAPL</h1>
          <h1 className="text-[#615D5D]">100 shares</h1>
        </div>
        <h1 className="text-[#615D5D]">$226.05</h1>
        <h1 className="text-[#009D10]">+$100</h1>
        <h1 className="text-[#009D10]">$1000</h1>
      </div>
      <hr className="border-t-2 border-gray-400 w-full mt-auto" />
    </>
  );
}
