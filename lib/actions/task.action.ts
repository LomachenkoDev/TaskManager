"use server";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import Task from "@/database/models/task.model";
import { createTaskParams } from "@/types";

export async function createTask(params: createTaskParams) {
  try {
    connectToDatabase();
    const { title, status, details, taskId, label = "work", path } = params;
    const newTask = await Task.create({
      title,
      status,
      details,
      taskId,
      label,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTasks() {
  try {
    connectToDatabase();
    const allTasks = await Task.find({}).sort({ createdAt: -1 });
    return { allTasks };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
