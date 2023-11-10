export interface ITask {
  taskId?: string;
  title: string;
  status: "pending" | "processing" | "success" | "failed";
  details: string;
  label?: string;
  createdAt: Date;
}

export interface createTaskParams {
  title: string;
  status: string;
  details: string;
  taskId?: string;
  label?: string;
  path: string;
}
