"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useId, useState } from "react";
import "../globals.css";

export default function page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  function handleSubmit(event: any) {
    event.preventDefault();
    if (!formData.email.includes("@gmail.com")) {
      console.log("Enter valid email address");
    } else {
      console.log("Login in successful!");
    }
  }

  function handleChange(event: any) {
    setFormData((prevFormData) => {
      const { name, value } = event.target;
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  const id = useId();
  return (
    <>
      <Link href="/">
        <h1 className="md:hidden font-breul text-3xl cursor-pointer m-10 bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent">
          Solstice
        </h1>
      </Link>
      <main className="flex justify-center ">
        <div className="hidden md:block md:w-[45%] h-max">
          <Image
            src="/images/solstice-login-bg.jpg"
            alt="illustration of a stock graph"
            width={804}
            height={1140}
            className="w-full h-screen"
          />
        </div>
        <div className="md:w-[55%] w-full flex flex-col ">
          <Link href="/">
            <h1 className="hidden md:block font-breul text-3xl cursor-pointer mt-5 mx-10 self-end ">
              Solstice
            </h1>
          </Link>

          <div className="flex mt-auto mb-auto justify-center items-center ">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-screen mx-10 md:w-[50%]"
            >
              <h1 className="text-3xl mb-8 font-barlow">Log in</h1>
              <label htmlFor={id + "-email"} className="font-barlow">
                email
              </label>
              <br />
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                value={formData.email}
                name="email"
                onChange={handleChange}
                className="border-black p-3 border-2 my-2 w-full font-barlow"
                id={id + "-email"}
              />
              <label htmlFor={id + "-password"} className="font-barlow">
                password
              </label>
              <br />
              <input
                type="password"
                placeholder="*****"
                value={formData.password}
                name="password"
                onChange={handleChange}
                className="border-black p-3 border-2 my-2 w-full font-barlow"
                id={id + "-password"}
              />
              <button className="text-white font-roboto px-8 py-4 bg-black w-full mt-8">
                Log In
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
