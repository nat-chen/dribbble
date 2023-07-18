import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "@/lib/sessions";
import { getProjectDetails } from "@/lib/actions";
import Modal from "@/components/Modal";
import ProjectActions from "@/components/ProjectActions";
import RelatedProjects from "@/components/RelatedProjects";
import { ProjectInterface } from "@/common.types";

const Project = async ({ params: { id } }: { params: { id: string } }) => {};
