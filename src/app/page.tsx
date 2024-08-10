import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/structure/Navbar";
export default function Home() {
  return (
    <>
      <main className="md:flex mb-5 flex-col mx-10 h-max">
        <Navbar />
        <div className="md:flex gap-20 my-10 md:my-20 ">
          <div className=" flex flex-col flex-wrap mb-5">
            <h1 className="font-helvetica text-4xl md:text-7xl mb-5">
              Revolutionize Your
            </h1>
            <h1 className="font-helvetica text-4xl md:text-7xl">
              Stock Trading Journey
            </h1>
          </div>
          <div className="flex flex-col  ">
            <p className="font-roboto text-lg md:text-2xl mb-2">
              Your gateway to advanced tools,
            </p>
            <p className="font-roboto text-lg md:text-2xl mb-8">
              data, and expert insights at your fingertips.
            </p>
            <Link href="/signup">
              <button className="text-white font-roboto px-8 py-4 bg-black w-max ">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </main>
      <div className="w-screen">
        <Image
          src="/images/solstice-landing-bg.png"
          alt="illustration of a stock graph"
          layout="responsive"
          width={2156}
          height={896}
          className="w-max md:w-full h-auto"
        />
      </div>
    </>
  );
}
