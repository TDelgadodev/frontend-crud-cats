"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          passHref
          className="text-white text-sm md:text-base font-semibold hover:text-gray-300 focus:outline-none focus:ring focus:border-blue-300 transition"
        >
          {" "}
          Home
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
          </>
        ) : (
          <>
            <Link
              href="/login"
              passHref
              className="ml-4 text-white text-sm md:text-base font-semibold hover:text-gray-300 focus:outline-none focus:ring focus:border-blue-300 transition"
            >
              Login
            </Link>
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
