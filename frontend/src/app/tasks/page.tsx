import { AddTask, ToggleTask, DeleteTask } from "@/components/tasks";
import { Task } from "@/types/Task";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Tasks Page",
};

const TasksPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`,
    {
      method: "GET",
      headers: { Cookie: `token=${token}` },
      cache: "no-store", // always fresh
      credentials: "include",
    }
  );

  if (response.status === 401) redirect("/login");

  const tasks: Task[] = await response.json();

  return (
    <section className="max-w-2xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <AddTask />
      {tasks.length > 0 ? (
        <ul role="list" className="space-y-2 mt-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex items-center justify-between p-2 border rounded"
            >
              <label className="flex items-center space-x-2">
                <ToggleTask id={task._id} completed={task.completed} />
                <span
                  className={task.completed ? "line-through text-gray-500" : ""}
                >
                  {task.title}
                </span>
              </label>
              <DeleteTask id={task._id} title={task.title} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-red-600">No tasks to show!</p>
      )}
    </section>
  );
};

export default TasksPage;
