import { createYoga } from "graphql-yoga";
import { schema } from "@/graghql/schema";

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export { handleRequest as GET, handleRequest as POST };
