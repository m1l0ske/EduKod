"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Header from "../_components/Header";

export default function AuthPage() {
  const { data: session, status } = useSession();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/profile";

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
      callbackUrl,
    });

    setLoading(false);
  }

  // Prevent hydration mismatch
  if (status === "loading") return null;

  // Already signed in
  if (session) {
    return (
      <div className="min-h-screen bg-[#18171C] text-white">
        <Header />

        <div className="pt-24 p-6 flex flex-col items-center gap-4">
          <p className="text-lg">
            Signed in as {session.user?.email}
          </p>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-red-400"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#18171C] min-h-screen grid items-center p-6 justify-center relative">
      {/* background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/loginDesign.png"
          alt="Background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <Header />

      <div className="w-screen sm:w-128 sm:h-128 rounded-4xl sm:bg-white/10 sm:backdrop-blur-xl flex flex-col gap-6 pt-24 p-6">
        <div>
          <h1 className="text-white text-center text-2xl sm:text-start sm:text-4xl">
            Login
          </h1>

          <h2 className="text-accent-color text-center text-lg sm:text-start sm:text-xl">
            Welcome back, please log in to your account
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <input
            className={`
              bg-primary text-accent-color rounded-lg p-3
              shadow-[0_0px_8px_rgba(0,0,0,0.25)]
              outline-none
              ${
                error
                  ? "border border-red-500 placeholder-red-400 shadow-[0_0px_8px_rgba(239,68,68,0.5)]"
                  : ""
              }
            `}
            type="text"
            placeholder={error ?? "Email or username"}
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              setError(null);
            }}
          />

          <input
            className={`
              bg-primary text-accent-color rounded-lg p-3
              shadow-[0_0px_8px_rgba(0,0,0,0.25)]
              outline-none
              ${
                error
                  ? "border border-red-500 shadow-[0_0px_8px_rgba(239,68,68,0.5)]"
                  : ""
              }
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
            className="bg-accent-color sm:bg-primary text-primary sm:text-white rounded-lg p-3 disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          <div className="flex justify-around gap-4">
            <button
              onClick={() => signIn("github", { callbackUrl })}
              className="bg-primary w-16 h-16 text-white rounded-full cursor-pointer"
            >
              GH
            </button>

            <button
              onClick={() => signIn("google", { callbackUrl })}
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
