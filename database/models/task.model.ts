import { Schema, models, model } from "mongoose";
import { ITask } from "@/types";

const TaskSchema = new Schema<ITask>({
  taskId: { type: String, default: "Task1" },
  title: { type: String, required: true },
  status: { type: String, required: true },
  details: { type: String, required: true },
  label: { type: String, default: "work" },
  createdAt: { type: Date, default: Date.now() },
});

const Task = models.Task || model<ITask>("Task", TaskSchema);
export default Task;
