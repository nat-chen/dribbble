"use client";

import Link from "next/link";
import Image from "next/image";

import React, { ChangeEvent, useState } from "react";
import { NavLinks } from "@/constant";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/sessions";
import ProfileMenu from "./ProfileMenu";
import Button from "./Button";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { changeSearch } from "@/redux/features/searchSlice";

const Navbar = () => {
  const { data: session } = useSession();
  const search = useAppSelector((state) => state.searchReducer.value);
  const dispatch = useAppDispatch();
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearch(e.target.value));
    // fetchProjectListByFilter();
  };
  const fetchProjectListByFilter = async () => {
    const searchQuery = search ? `?search=${search}` : "";
    await fetch("http://localhost:3000/project/list${searchQuery}").then(
      (res) => res.json()
    );
  };
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={116} height={43} alt="Dribbble" />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex flexStart rounded-full bg-slate-100 py-2 px-5">
        <Image
          alt="search"
          src={"/magnifying-glass.svg"}
          width={16}
          height={16}
        />
        <input
          className="py-1 px-2 bg-slate-100 outline-none text-sm"
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />
            <Link href="/project/create">
              <Button title="Share Work" />
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
