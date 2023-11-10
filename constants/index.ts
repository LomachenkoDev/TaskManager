import { ITask } from "@/types";
export const mockTasks: ITask[] = [
  {
    id: "1",
    title: "Task 1",
    status: "pending",
    details: "Complete project milestone",
    label: "Work",
  },
  {
    id: "2",
    title: "Task 2",
    status: "processing",
    details: "Review and update documentation",
    label: "Personal",
    priority: "medium",
  },
  {
    id: "3",
    title: "Task 3",
    status: "success",
    details: "Prepare for upcoming presentation",
    label: "Study",
    priority: "high",
  },
  {
    id: "4",
    title: "Task 4",
    status: "failed",
    details: "Fix bugs in the application",
    label: "Work",
    priority: "medium",
  },
];
