import { builder } from "../bulider";

builder.prismaObject("Category", {
  fields: (t) => ({
    id: t.exposeString("id"),
    name: t.exposeString("name"),
  }),
});
