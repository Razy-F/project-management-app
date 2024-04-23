import express from "express";
import "dotenv/config";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
const port = process.env.PORT || 5000;

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV == "development",
  })
);
app.listen(port, console.log(`Server runs on port ${port}`));
