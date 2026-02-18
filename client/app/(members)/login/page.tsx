"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Logo from "@/components/Logo";
import { LoginForm } from "./_components/LoginForm";
import { useDispatch } from "react-redux";
import { setTheme } from "@/lib/features/slices/theme";
import { motion } from "framer-motion";

export default function LoginPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme !== null) {
      dispatch(setTheme(JSON.parse(storedTheme)));
    }
  }, [dispatch]);

  return (
    <div className="flex h-screen w-full transition-colors duration-500">

      <div className="hidden lg:flex w-[75%] relative">
                <div
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out opacity-100 scale-100`}
                >
                    <Image
                        width={2000}
                        height={2000}
                        src={"/why/why5.jpg"}
                        alt={"auth Page"}
                        className="object-cover size-full"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-primary/5 to-secondary/15" />

                    <div className="absolute bottom-32 left-20 right-20 z-20">
                        <div className={`transition-all duration-1000 delay-300 transform`}>
                            <h2 className="text-4xl xl:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                                {"We Like Ethiopia"}
                            </h2>
                            <p className="text-xl xl:text-2xl text-gray-300 max-w-2xl font-light leading-relaxed">
                                Master everything from Linked Lists to Dynamic Programming in one unified environment. Designed for the modern developer.
                            </p>

                            <div className="mt-10 h-1.5 w-32 bg-gradient-to-r from-primary to-secondary rounded-full" />
                        </div>
                    </div>

                </div>
      </div>

      <div className="w-full lg:w-[25%] flex items-center justify-center px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full  space-y-10"
        >
          <div className="space-y-6 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <Logo />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-thin tracking-tighter text-text1">
                Welcome <span className="font-normal">Back.</span>
              </h1>
              <p className="text-text2 font-light">
                Enter your credentials to access your account.
              </p>
            </div>
          </div>

          <div className="">
            <LoginForm />
          </div>
        </motion.div>
      </div>

    </div>
  );
}
