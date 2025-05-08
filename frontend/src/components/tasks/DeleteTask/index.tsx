"use client";

import useDeleteTask from "./useDelete";

interface DeleteProps {
  id: string;
  title: string;
}

const DeleteTask = ({ id, title }: DeleteProps) => {
  const { loading, remove } = useDeleteTask();

  return (
    <button
      onClick={() => remove(id)}
      aria-label={`Delete ${title}`}
      className="text-red-600 hover:underline text-sm"
    >
      {loading ? "Loading..." : "Delete"}
    </button>
  );
};

export default DeleteTask;
