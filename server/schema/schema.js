import { projects, clients } from "../dummyData.js";
import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

import Client from "../models/Client.js";
import Project from "../models/Project.js";
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
    client: {
      type: ClientType,
      resolve: (project) => Client.findById(parent.clientId),
    },
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
        return Client.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      description: "List of clients",
      resolve: () => Client.find(),
    },
    project: {
      type: ProjectType,
      description: "Get specific project",
      args: { id: { type: GraphQLID } },
      //where we have our return whatever we want to respond thats called resolver
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      description: "List of Projects",
      resolve() {
        return Project.find();
      },
    },
  },
});

/* -------------------------------- Mutation -------------------------------- */
const mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Mutation section",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const newClient = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return newClient.save();
      },
    },
    //Delete Client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => Client.findByIdAndDelete(args.id),
    },
  },
});

export default new GraphQLSchema({
  description: "Welcome to the Progect managment application",
  query: RootQuery,
  mutation,
});
