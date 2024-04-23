import { projects, clients } from "../dummyData.js";
import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

/* ------------------------------- Client Type ------------------------------ */
const ClientType = new GraphQLObjectType({
  name: "Client",
  description: "This is a client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});
/* ------------------------------ Project Type ------------------------------ */
const ProjectType = new GraphQLObjectType({
  name: "Project",
  description: "Thhis represent an project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

/* To make a query to get for example a client by the ID then we need to create a root query object  */

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Root Query",
  fields: {
    client: {
      type: ClientType,
      description: "Get specific client",
      args: { id: { type: GraphQLID } },
      //where we have our return whatever we want to respond thats called resolver
      resolve(parent, args) {
        return clients.find((client) => client.id === args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      description: "List of clients",
      resolve: () => clients,
    },
    project: {
      type: ProjectType,
      description: "Get specific project",
      args: { id: { type: GraphQLID } },
      //where we have our return whatever we want to respond thats called resolver
      resolve(parent, args) {
        return projects.find((project) => project.id === args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      description: "List of Projects",
      resolve: () => projects,
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
