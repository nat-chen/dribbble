import { builder } from "../bulider";

builder.prismaObject("Project", {
  fields: (t) => ({
    id: t.exposeString("id"),
    title: t.exposeString("id"),
    description: t.exposeString("id"),
    imageUrl: t.exposeString("id"),
    websiteUrl: t.exposeString("id"),
    githubUrl: t.exposeString("id"),
    // createdAt: t.field("createdAt"),
    // updatedAt: t.exposeString("updatedAt"),
    user: t.relation("user"),
    category: t.relation("category"),
  }),
});

builder.queryField("projects", (t) =>
  t.prismaField({
    type: ["Project"],
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.project.findMany({ ...query }),
  })
);
