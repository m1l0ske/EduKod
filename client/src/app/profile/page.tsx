"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "../_components/Header";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/test");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div className="p-10 text-white">Loading...</div>;
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#18171C] text-white">
      <Header />

      <div className="pt-24 max-w-3xl mx-auto p-6">
        <h1 className="text-4xl mb-6">Profile</h1>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 flex flex-col gap-4">
          <p>
            <span className="text-accent-color">Email:</span>{" "}
            {session.user?.email}
          </p>

          <p>
            <span className="text-accent-color">Name:</span>{" "}
            {session.user?.name ?? "No name set"}
          </p>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-500 px-4 py-2 rounded-lg w-fit"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
