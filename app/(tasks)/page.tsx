import { columns } from "@/components/shared/Columns";
import { DataTable } from "@/components/shared/DataTable";
import { mockTasks } from "@/constants";
import TaskForm from "@/components/shared/TaskForm";
import { Toaster } from "@/components/ui/toaster";
import { getTasks } from "@/lib/actions/task.action";
export default async function Home() {
  const data = mockTasks;
  const result = await getTasks();
  console.log("this is a ", result);
  console.log("this is mock", data);
  return (
    <main className=" bg-dark-100 flex min-h-screen flex-col  w-full px-8">
      <div className="flex-col flex h-screen ">
        <TaskForm size={result.allTasks.length} />

        <div className="container mx-auto py-10 rounded-xl bg-dark-200 text-white w-full mt-10">
          <DataTable columns={columns} data={result.allTasks} />
        </div>
      </div>
      <Toaster />
    </main>
  );
}
