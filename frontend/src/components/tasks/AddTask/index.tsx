"use client";

import useAddTask from "./useAddTask";

const AddTask = () => {
  const { title, loading, setTitle, addTask } = useAddTask();

  return (
    <div className="flex">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task…"
        className="flex-1 p-2 border rounded-l"
      />
      <button
        onClick={addTask}
        className="px-4 bg-green-600 text-white rounded-r hover:bg-green-700"
      >
        {loading ? "Loading..." : "Add Task"}
      </button>
    </div>
  );
};

export default AddTask;
