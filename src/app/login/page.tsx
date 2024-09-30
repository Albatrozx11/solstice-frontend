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
    password: "",
  });
  const [token, setToken] = useState("");
  const router = useRouter();
  async function handleSubmit(event: any) {
    event.preventDefault();

    const { username, password } = formData;

    const userData = {
      username,
      password,
    };

    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        document.cookie = `auth-token=${data.token}; path=/;`
        router.push("/dashboard");
      } else {
        alert("Login failed");
      }
      
    } catch (error) {
      alert("Login failed");
    }
  }

  function handleChange(event: any) {
    setFormData((prevFormData: any) => {
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
              <label htmlFor={id + "-username"} className="font-barlow">
                username
              </label>
              <br />
              <input
                type="text"
                placeholder="johndoe"
                value={formData.username}
                name="username"
                onChange={handleChange}
                className="border-black p-3 border-2 my-2 w-full font-barlow"
                id={id + "-username"}
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
