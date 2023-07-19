"use client";

import Input from "@/components/Input";
import Link from "next/link";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Signin = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignIn = async function () {
    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password,
      callbackUrl: "/",
    });
    if (res?.error) {
      setError(res?.error);
      return;
    }
    if (error) {
      setError("");
    }
    router.replace("/home");
  };

  return (
    <div className="m-24">
      <div className="font-semibold text-2xl">Sign In to Dribbble</div>
      <button className="w-full flex justify-center font-medium my-8 py-4 border border-slate-900 rounded">
        <Image
          src="/github.svg"
          alt="github"
          width="20"
          height="20"
          className="mr-2"
        />{" "}
        Sign In with Github
      </button>
      <div className="flexCenter my-6">
        <div className="border-t border-slate-300 flex-1"></div>
        <div className="font px-2 text-slate-500">OR sign in with email</div>
        <div className="border-t border-slate-300 flex-1"></div>
      </div>
      <div>
        <div className="py-4">
          <Input
            title="Email"
            value={email}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <div className="py-4">
          <Input
            title="Password"
            type="password"
            value={password}
            placeholder="6+ characters"
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <div className="italic text-red-500 text-sm">
          {error && `**${error}`}
        </div>

        <button
          className="flex w-full justify-center bg-slate-950 text-slate-50 py-4 my-6 rounded-md"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <div>
          Dont have an account?{" "}
          <Link href="/auth/signup" className="text-indigo-600">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
