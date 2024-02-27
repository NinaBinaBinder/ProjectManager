"use client";

import { addProject } from "@/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddProject() {
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState<Date>();

  const router = useRouter();

  async function handleAdd() {
    if (name.length < 4 || typeof deadline === undefined) {
      const d = new Date();
      setDeadline(d);
      return toast.error("please enter valid project name and deadline");
    } else {
      try {
        await addProject({ name, deadline: String(deadline) });
      } catch (error) {
        console.error(error);
      }
    }
    router.refresh();
  }

  return (
    <form className="flex flex-col rounded border m-3 bg-blue-200 p-3 w-1/2">
      <input
        className="m-2 rounded p-2"
        onChange={(e) => setName(e.currentTarget.value)}
        type="text"
        placeholder="project name"
      />
      <label htmlFor="deadline">Deadline:</label>
      <input
        className="m-2 rounded p-2"
        onChange={(e) => setDeadline(new Date(e.currentTarget.value))}
        type="date"
        id="deadline"
      />
      <button
        className="rounded bg-blue-500 hover:bg-blue-600 p-2 my-5 text-gray-50 m-auto"
        type="button"
        onClick={handleAdd}
      >
        add new project
      </button>
    </form>
  );
}
