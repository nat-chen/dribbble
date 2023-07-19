"use client";

import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";
import { getClient } from "@/lib/apollo";
import { useAppSelector } from "@/redux/hook";
import { ApolloProvider, gql, useQuery } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
};

type Props = {
  searchParams: SearchParams;
};

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const Home = ({ searchParams: { category, endcursor } }: Props) => {
  const searchParams = useSearchParams();
  const [projectList, setProjectList] = useState<>([]);
  const search = useAppSelector((state) => state.searchReducer.value);

  useEffect(() => {
    const fetchProjectList = async () => {
      let query = "";
      if (searchParams.get("category")) {
        query = `?category=${searchParams.get("category")}`;
      }
      if (search) {
        query = query ? `${query}&search=${search}` : `?search=${search}`;
      }

      return await fetch(`http://localhost:3000/api/project/list${query}`).then(
        async (res) => {
          const data = (await res.json()).data;
          setProjectList(data);
        }
      );
    };
    fetchProjectList();
  }, [searchParams, search]);
  if (projectList.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center">
          No projects found, go create some first.
        </p>
      </section>
    );
  }
  return (
    <section className="flexStart flex-col paddings mb-16">
      <Categories />
      <section className="projects-grid">
        {projectList.map((node) => (
          <ProjectCard
            key={`${node.id}`}
            id={node.id}
            image={node.imageUrl}
            title={node.title}
            name={node.user.username}
            avatarUrl={node.user.avatarUrl}
            userId={node.user.id}
          />
        ))}
      </section>
    </section>
  );
};

export default Home;
