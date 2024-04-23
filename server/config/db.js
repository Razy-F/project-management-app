import { connect } from "mongoose";
import colors from "colors";

export default async function connectDB() {
  const { cyan } = colors;
  const conn = await connect(process.env.MONGO_DB, {
    dbName: "projects-managment-app",
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
}
