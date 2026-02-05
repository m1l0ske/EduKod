"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export default function AuthButton() {
  const { data: session } = useSession();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function isEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function register() {
    setError(null);

    if (!identifier || !password) {
      setError("Missing credentials");
      return;
    }

    // If user typed "@", it MUST be a valid email
    if (identifier.includes("@") && !isEmail(identifier)) {
      setError("Invalid email format");
      return;
    }

    setLoading(true);

    const payload = isEmail(identifier)
      ? { email: identifier, password, name }
      : { username: identifier, password, name };

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to create account");
      setLoading(false);
      return;
    }

    await signIn("credentials", {
      ...payload,
      callbackUrl: "/",
    });

    setLoading(false);
  }

  if (session) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-white">
          Signed in as {session.user?.email}
        </p>
        <button onClick={() => signOut()} className="text-red-400">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#18171C] grid items-center h-screen p-6 justify-center relative">
      <Image
        src="/loginDesign.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      <div className="w-128 h-128 rounded-4xl bg-white/10 backdrop-blur-xl flex flex-col gap-6 pt-24 p-6">
        <div>
          <h1 className="text-white text-4xl">Login</h1>
          <h2 className="text-accent-color text-xl">
            Welcome back, please log in to your account
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Identifier */}
          <input
            className={`
              bg-primary text-accent-color rounded-lg p-3
              shadow-[0_0px_8px_rgba(0,0,0,0.25)]
              outline-none
              ${error ? "border border-red-500 placeholder-red-400 shadow-[0_0px_8px_rgba(239,68,68,0.5)]" : ""}
            `}
            type="text"
            placeholder={error ?? "Email or username"}
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              setError(null);
            }}
          />

          {/* Password */}
          <input
            className={`
              bg-primary text-accent-color rounded-lg p-3
              shadow-[0_0px_8px_rgba(0,0,0,0.25)]
              outline-none
              ${error ? "border border-red-500 shadow-[0_0px_8px_rgba(239,68,68,0.5)]" : ""}
            `}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
          />

          <button
            onClick={register}
            disabled={loading}
            className="bg-primary text-white rounded-lg p-3 disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          <span className="text-center text-2xl text-primary">OR</span>

          <div className="flex justify-around gap-4">
            <button
              onClick={() => signIn("github")}
              className="bg-primary w-16 h-16 text-white rounded-full cursor-pointer"
            >
              GH
            </button>

            <button
              onClick={() => signIn("google")}
              className="bg-primary w-16 h-16 text-white rounded-full cursor-pointer"
            >
              G
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
