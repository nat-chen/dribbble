"use client";

import { useParams } from "next/navigation";
import Image from "next/image";

import ProjectForm from "@/components/ProjectForm";
import { useEffect, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

const Settings = ({ params: { id } }: { params: { id: string } }) => {
  // if (!session?.user) redirect("/");
  const [form, setForm] = useState({
    username: "",
    email: "",
    avatarUrl: "",
  });
  const handleFormSubmit = () => {
    fetch(`http://localhost:3000/api/user/${params.id}`, {
      method: "POST",
      body: JSON.stringify(form),
    }).then(async (res) => {});
  };
  const handleUsernameChange = (e) => {
    setForm({
      ...form,
      username: e.target.value,
    });
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      fetch(`http://localhost:3000/api/upload`, {
        method: "POST",
        body: JSON.stringify({ path: reader.result }),
      }).then(async (res) => {
        const avatarUrl = (await res.json()).url;
        setForm({
          ...form,
          avatarUrl,
        });
      });
    };
  };

  const params = useParams();
  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await fetch(`http://localhost:3000/api/user/${params.id}`);
      const { data: userProfile } = await res.json();
      setForm({
        username: userProfile.username,
        email: userProfile.email,
        avatarUrl: userProfile.avatarUrl,
      });
    };
    fetchUserProfile();
  }, [params.id]);
  return (
    <div>
      <Image
        src="/settings-bg.png"
        alt="banner"
        width="100"
        height="100"
        style={{
          width: "100%",
          height: "200px",
          objectFit: "fill",
        }}
      />
      <form onSubmit={handleFormSubmit} className="flexCenter">
        <div className="w-1/2">
          <div className="py-4">
            <Input
              title="Username"
              value={form.username}
              handleChange={handleUsernameChange}
            />
          </div>
          <div className="py-4">
            <Input title="Email" value={form.email} disabled={true} />
          </div>
          <div className="font-semibold pt-4">Avatar</div>
          <div className="py-4 flex-col  relative">
            <label className="relative" id="avatar">
              <Image
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                src="/plus.svg"
                alt="avatar"
                width={30}
                height={30}
              />
              <Image
                className="rounded-full"
                src={form?.avatarUrl}
                alt="avatar"
                width={100}
                height={100}
              />
              <div className="cursor-pointer rounded-full absolute top-0 left-0 hover:bg-slate-400 opacity-60 w-[100px] h-[100px]" />
              <input
                type="file"
                id="avatar"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          <div className="flexEnd mt-6 mb-12">
            <Button title="Save changes" handleClick={handleFormSubmit} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
