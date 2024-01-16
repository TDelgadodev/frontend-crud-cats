"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; 
import { useState } from "react";

const RegisterPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const responseAPI = await res.json();

    if (!res.ok) {
      setErrors(responseAPI.message);
      return;
    }

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    
    
    if (responseNextAuth?.error) {
        setErrors(responseNextAuth.error.split(","));
        return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white border rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          name="name"
          className="w-full px-3 py-2 mb-4 border rounded-md"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="email"
          placeholder="email@example.com"
          name="email"
          className="w-full px-3 py-2 mb-4 border rounded-md"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          className="w-full px-3 py-2 mb-4 border rounded-md"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Register
        </button>
      </form>

      {errors.length > 0 && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
          <ul className="list-disc pl-5">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;

