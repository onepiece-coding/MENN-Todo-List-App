"use client";

import useToggleTask from "./useToggle";

interface ToggleProps {
  id: string;
  completed: boolean;
}

const ToggleTask = ({ id, completed }: ToggleProps) => {
  const { toggle } = useToggleTask();

  return (
    <input
      type="checkbox"
      checked={completed}
      onChange={() => toggle(id, completed)}
    />
  );
};

export default ToggleTask;
