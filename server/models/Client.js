import { Schema, model } from "mongoose";

const ClientSchema = new Schema({
  name: String,
  email: String,
  phone: String,
});

export default model("Client", ClientSchema);
