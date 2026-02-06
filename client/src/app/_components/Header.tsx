"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleProfileClick = () => {
    if (status === "loading") return;

    const callback = window.location.pathname;

    if (!session) {
      router.push(`/test?callbackUrl=${callback}`);
    } else {
      router.push("/profile");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full h-12 backdrop-blur-xl flex items-center justify-center text-xl text-accent-color z-50">
      <nav className="flex gap-16">
        <Link href="/" className="hover:opacity-80 transition cursor-pointer">
          Home
        </Link>

        <Link href="/lessons" className="hover:opacity-80 transition cursor-pointer">
          Lessons
        </Link>

        <button
          onClick={handleProfileClick}
          className="hover:opacity-80 transition cursor-pointer"
        >
          Profile
        </button>
      </nav>
    </header>
  );
}
