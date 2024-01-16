"use client";

import LoginIcon from "@/icons/Login";
import GoogleIcon from "../icons/Google";
import { signOut, useSession, signIn } from "next-auth/react";
import Link from "next/link";
import HomeIcon from "@/icons/Home";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          passHref
          className="ml-4 flex items-center text-white text-sm md:text-base font-semibold hover:text-gray-300 focus:outline-none focus:ring focus:border-blue-300 transition"
        >
          <HomeIcon className="size-6 inline-block mr-2" />
          <span>Home</span>
        </Link>
        {session?.user ? (
          <>
            <Link
              href="/dashboard"
              passHref
              className="ml-4 text-white text-sm md:text-base font-semibold hover:text-gray-300 focus:outline-none focus:ring focus:border-blue-300 transition"
            >
              Dashboard
            </Link>
            <button
              onClick={() => signOut()}
              className="ml-4 bg-red-500 text-white py-1 px-2 rounded-md text-sm md:text-base font-semibold hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300 transition"
            >
              Signout
            </button>
            {session.user?.picture && (
              <div className="ml-4 flex items-center">
                <Image
                  src={session.user.picture}
                  alt={session.user?.name ?? "User"}
                  width={32}
                  height={32}
                  className="rounded-full mr-2"
                />
                <span className="text-white text-sm md:text-base font-semibold">
                  {session.user.name}
                </span>
              </div>
            )}
          </>
        ) : (
          <>
            <Link
              href="/login"
              passHref
              className="ml-4 flex items-center text-white text-sm md:text-base font-semibold hover:text-gray-300 focus:outline-none focus:ring focus:border-blue-300 transition"
            >
              <LoginIcon className="size-6 inline-block mr-2" />
              <span>Login</span>
            </Link>
            <div className="ml-4 flex items-center text-white text-sm md:text-base font-semibold hover:text-gray-300 focus:outline-none focus:ring focus:border-blue-300 transition">
              <GoogleIcon className="size-6 inline-block mr-2" />
              <button onClick={() => handleGoogleSignIn()}>
                Login with Google
              </button>
            </div>
            <Link
              href="/register"
              passHref
              className="ml-4 text-white text-sm md:text-base font-semibold hover:text-gray-300 focus:outline-none focus:ring focus:border-blue-300 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
