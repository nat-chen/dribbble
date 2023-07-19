import { User, Session } from "next-auth";

export interface Category {
  id: string;
  name: string;
}

export type FormState = {
  title: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  githubUrl: string;
  category: Category;
};

export interface ProjectInterface {
  title: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  githubUrl: string;
  category: Category;
  id: string;
  // createdBy: {
  //   name: string;
  //   email: string;
  //   avatarUrl: string;
  //   id: string;
  // };
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  description: string | null;
  avatarUrl: string;
  githubUrl: string | null;
  websiteUrl: string | null;
  projects: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    username: string;
    email: string;
    avatarUrl: string;
  };
}

export interface ProjectForm {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
}
