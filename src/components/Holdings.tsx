import Link from "next/link";

interface HoldingProps {
  ticker: string;
  quantity: number;
  price: number;
  currentValue: number;
}

export default function Holding({ ticker, quantity, price, currentValue }: HoldingProps) {
  return (
    <>
      <div className="flex justify-between px-2 my-4 mx-4 items-center">
        <div className="flex flex-col">
          <Link href={`/company/${ticker}`}>
            <h1 className="text-black opacity-80">{ticker}</h1>
          </Link>
          <h1 className="text-[#615D5D]">{quantity} shares</h1>
        </div>
        <h1 className="text-[#615D5D]">${(price/quantity).toFixed(2)}</h1>
        <h1 className={`${currentValue >= price ? "text-green-500" : "text-red-600"}`}>
          {currentValue >= price ? "+" : "-"}${Math.abs(currentValue - price).toFixed(2)}
        </h1>
        <h1 className="text-[#009D10]">${currentValue.toFixed(2)}</h1>
      </div>
      <hr className="border-t-2 border-gray-400 w-full mt-auto" />
    </>
  );
}
