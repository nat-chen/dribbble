"use client";

import { useParams } from "next/navigation";

import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { getCurrentUser } from "@/lib/sessions";
import { getProjectDetails } from "@/lib/actions";
import { ProjectInterface } from "@/common.types";
import { useEffect, useState } from "react";

const EditProject = ({ params: { id } }: { params: { id: string } }) => {
  // if (!session?.user) redirect("/");
  const [project, setProject] = useState({});
  const params = useParams();
  useEffect(() => {
    const fetchProjectDetails = async () => {
      await fetch(
        `http://localhost:3000/api/project/details/${params.id}`
      ).then(async (res) => {
        const data = await res.json();
        setProject(data.data);
      });
    };
    fetchProjectDetails();
  }, [params.id]);
  if (!project) {
    return <p className="no-result-text">Failed to fetch project info</p>;
  }
  return (
    <Modal>
      <h3 className="modal-head-text">Edit Project</h3>
      <ProjectForm type="edit" project={project} />
    </Modal>
  );
};

export default EditProject;
