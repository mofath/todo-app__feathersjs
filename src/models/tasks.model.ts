// tasks-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from "../declarations";
import mongoose, { Model, Mongoose } from "mongoose";

export default function (app: Application): Model<any> {
  const modelName = "tasks";
  const mongooseClient: Mongoose = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      name: { type: String, required: "{Task name} is required!" },
      description: {
        type: String,
        required: "{Task description} is required!",
      },
      isFinished: { type: Boolean, default: false },
      time: {
        type: Number, // number represents hours spent on the task
        default: 0,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
