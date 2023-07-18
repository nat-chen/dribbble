"use client";

import Input from "@/components/Input";
import Link from "next/link";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";

const Signup = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="m-24">
      <div className="font-semibold text-2xl">Sign up to Dribbble</div>
      <button className="w-full flex justify-center font-medium my-8 py-4 border border-slate-900 rounded">
        <Image
          src="/github.svg"
          alt="github"
          width="20"
          height="20"
          className="mr-2"
        />{" "}
        Login with Github
      </button>
      <div className="flexCenter my-6">
        <div className="border-t border-slate-300 flex-1"></div>
        <div className="px-2 text-slate-500">OR</div>
        <div className="border-t border-slate-300 flex-1"></div>
      </div>
      <div>
        <div className="py-4">
          <Input
            title="Username"
            value={username}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </div>

        <div className="py-4">
          <Input
            title="Email"
            value={email}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </div>

        <div className="py-4">
          <Input
            title="Password"
            value={password}
            placeholder="6+ characters"
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </div>

        <button className="flex w-full justify-center bg-slate-950 text-slate-50 py-4 my-6 rounded-md">
          Create Account
        </button>
        <div>
          Already a member?{" "}
          <Link href="/signin" className="text-indigo-600">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
