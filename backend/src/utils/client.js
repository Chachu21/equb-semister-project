import { GraphQLClient } from "graphql-request";
// eslint-disable-next-line no-unused-vars
import * as dotenv from "dotenv";

dotenv.config();
const client = new GraphQLClient(process.env.HASURA_GRAPHQL_URL, {
  headers: {
    "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  },
});
export default client;
