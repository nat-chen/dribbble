import { builder } from "../bulider";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeString("id"),
    // createdAt: t.("createdAt"),
    // updatedAt: t.exposeString("updatedAt"),
    username: t.exposeString("username"),
    password: t.exposeString("password", { nullable: true }),
    avatarUrl: t.exposeString("avatarUrl", { nullable: true }),
    role: t.expose("role", { type: Role }),
    projects: t.relation("projects"),
  }),
});

const Role = builder.enumType("Role", {
  values: ["USER", "ADMIN"] as const,
});
