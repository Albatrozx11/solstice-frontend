"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useId, useState } from "react";
import "../globals.css";
import { useRouter } from "next/navigation";

export default function page() {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const router = useRouter();

  async function handleSubmit(event: any) {
    event.preventDefault();

    const {
      username,
      first_name,
      last_name,
      email,
      password,
      passwordConfirm,
    } = formData;

    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      username,
      first_name,
      last_name,
      email,
      password,
      passwordConfirm,
    };

    try {
      const response = await fetch("http://localhost:8000/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("signup successful:", data);
        alert("Signup successful Redirecting to login...");
        router.push("/login");
      } else {
        console.log("signup failed:", data);
        alert("Signup failed: " + data?.detail || "Unknown error");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred while signing up, please try again");
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
      <main className="flex justify-center">
        <div className="hidden md:block md:w-[45%] h-max">
          <Image
            src="/images/solstice-login-bg.jpg"
            alt="illustration of a stock graph"
            width={804}
            height={1140}
            className="w-full h-screen"
          />
        </div>
        <div className="md:w-[55%] w-full flex flex-col">
          <Link href="/">
            <h1 className="hidden md:block font-breul text-3xl cursor-pointer mt-5 mx-10 self-end bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent">
              Solstice
            </h1>
          </Link>

          <div className="flex mt-auto mb-auto justify-center items-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-screen mx-10 md:w-[50%]"
            >
              <h1 className="text-3xl mb-8 font-barlow">Sign Up</h1>
              <label htmlFor={id + "-username"} className="font-barlow">
                username
              </label>
              <br />
              <input
                type="text"
                placeholder="johndoe123"
                value={formData.username}
                name="username"
                onChange={handleChange}
                className="border-black p-3 border-2 my-2 w-full font-barlow"
                id={id + "-username"}
              />
              <label htmlFor={id + "-first_name"} className="font-barlow">
                first name
              </label>
              <br />
              <input
                type="text"
                placeholder="john"
                value={formData.first_name}
                name="first_name"
                onChange={handleChange}
                className="border-black p-3 border-2 my-2 w-full font-barlow"
                id={id + "-first_name"}
              />
              <label htmlFor={id + "-last_name"} className="font-barlow">
                last name
              </label>
              <br />
              <input
                type="text"
                placeholder="doe"
                value={formData.last_name}
                name="last_name"
                onChange={handleChange}
                className="border-black p-3 border-2 my-2 w-full font-barlow"
                id={id + "-last_name"}
              />
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
              <label htmlFor={id + "-password-confirm"} className="font-barlow">
                confirm password
              </label>
              <br />
              <input
                type="password"
                placeholder="*****"
                value={formData.passwordConfirm}
                name="passwordConfirm"
                onChange={handleChange}
                className="border-black p-3 border-2 my-2 w-full font-barlow"
                id={id + "-password-confirm"}
              />
              <button className="text-white font-roboto px-8 py-4 bg-black w-full mt-8">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
