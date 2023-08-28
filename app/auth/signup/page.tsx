"use client";

import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

const Signup = ({ children }: { children: React.ReactNode }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleFormChange = (type: string, value: string) => {
    setForm({
      ...form,
      [type]: value,
    });
  };
  const handleAccountRegister = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    await fetch("http://localhost:3000/api/account", {
      method: "POST",
      body: JSON.stringify(form),
    }).then(async (res) => {
      const { success, message } = await res.json();
      if (success) {
        toast.success("Sign up successfully");
        setTimeout(() => {
          signIn("credentials", {
            callbackUrl: "/home",
            redirect: true,
          });
        }, 1000);
      } else {
        toast.error(message);
      }
    });
  };

  const validateForm = function (): boolean {
    let isValid = true;
    if (!form.username) {
      isValid = false;
      toast.error("Username is empty");
    }
    if (!form.email) {
      isValid = false;
      toast.error("Email is empty");
    }
    if (!form.password || form.password.length < 5) {
      isValid = false;
      toast.error("Password should be at least 6 characters");
    }
    return isValid;
  };

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
            value={form.username}
            handleChange={(e) => handleFormChange("username", e.target.value)}
          />
        </div>

        <div className="py-4">
          <Input
            title="Email"
            value={form.email}
            handleChange={(e) => handleFormChange("email", e.target.value)}
          />
        </div>

        <div className="py-4">
          <Input
            type="password"
            title="Password"
            value={form.password}
            placeholder="6+ characters"
            handleChange={(e) => handleFormChange("password", e.target.value)}
          />
        </div>

        <button
          className="flex w-full justify-center bg-slate-950 text-slate-50 py-4 my-6 rounded-md"
          onClick={handleAccountRegister}
        >
          Create Account
        </button>
        <div>
          Already a member?{" "}
          <Link href="/auth/signin" className="text-indigo-600">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
