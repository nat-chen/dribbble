import prisma from "@/lib/prisma";

export const resolvers = {
  Query: {
    projects: () => {
      return prisma.project.findMany();
    },
  },
};
