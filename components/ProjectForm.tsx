"use client";

import Image from "next/image";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import FormField from "./FormField";
import Button from "./Button";
import CustomMenu from "./CustomMenu";
import { categoryFilters } from "@/constant";
import {
  Category,
  FormState,
  ProjectInterface,
  SessionInterface,
} from "@/common.types";
import { useSession } from "next-auth/react";
import { totalmem } from "os";

type Props = {
  type: string;
  // session: SessionInterface;
  project?: ProjectInterface;
};

const ProjectForm = ({ type, project }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    imageUrl: "",
    websiteUrl: "",
    githubUrl: "",
    category: { id: "", name: "" },
  });
  useEffect(() => {
    setForm({
      title: project?.title || "",
      description: project?.description || "",
      imageUrl: project?.imageUrl || "",
      websiteUrl: project?.websiteUrl || "",
      githubUrl: project?.githubUrl || "",
      category: project?.category || { id: "", name: "" },
    });
  }, [project]);
  const handleStateChange = (
    fieldName: keyof FormState,
    value: string | Category
  ) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image")) {
      alert("Please upload an image");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const result = reader.result as string;
      try {
        const response = await fetch(`http://localhost:3000/api/upload`, {
          method: "POST",
          body: JSON.stringify({
            path: result,
          }),
        });
        const res = await response.json();
        handleStateChange("imageUrl", res.url);
      } catch (err) {
        throw err;
      }
    };
  };
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    console.log("session", session);
    try {
      if (type === "create") {
        const res = await fetch("http://localhost:3000/api/project/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        console.log(res);
        // await createNewProject(form, session?.user?.id, token);
        router.push("/home");
      }
      if (type === "edit") {
        const res = await fetch("http://localhost:3000/api/project/edit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form, id: project?.id }),
        });
        console.log(res);
        // await updateProject(form, project?.id as string, token);
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
      alert(
        `Failed to ${
          type === "create" ? "create" : "edit"
        } a project. Try again!`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.imageUrl && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create" ? true : false}
          className="form_image-input"
          onChange={(e) => handleChangeImage(e)}
        />
        {form.imageUrl && (
          <Image
            src={form?.imageUrl}
            className="sm:p-10 object-contain z-20"
            alt="image"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects."
        isTextArea
        setState={(value) => handleStateChange("description", value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.websiteUrl}
        placeholder="https://jsmastery.pro"
        setState={(value) => handleStateChange("websiteUrl", value)}
      />
      <FormField
        type="url"
        title="GitHub URL"
        state={form.githubUrl}
        placeholder="https://github.com/adrianhajdin"
        setState={(value) => handleStateChange("githubUrl", value)}
      />
      <CustomMenu
        title="Category"
        state={form.category.name}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />
      <div className="flexStart w-full">
        <Button
          title={
            submitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={submitting ? "" : "/plus.svg"}
          submitting={submitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
