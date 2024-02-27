"use client";

import { editProject } from "@/actions";
import { Project } from "@/db/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function EditProject({ project }: { project: Project }) {
  const [name, setName] = useState(project.name);
  const [deadline, setDeadline] = useState<Date>(new Date(project.deadline));
  const [button, setButton] = useState(true);

  const router = useRouter();

  async function handleEdit() {
    if (name.length < 4 || typeof deadline === undefined) {
      return toast.error("please enter valid project name and deadline");
    } else {
      try {
        await editProject({ id: project.id, name, deadline: String(deadline) });
        setButton(!button);
      } catch (error) {
        console.error(error);
      }
    }
    router.refresh();
  }

  return (
    <div>
        {button ? <p></p> : <form className="flex flex-col rounded border m-3 bg-green-200 p-3 w-1/2">
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
      </form> }
      
      <button
        className="rounded bg-green-500 hover:bg-green-600 p-2 my-5 text-gray-50 m-auto"
        type="button"
        onClick={handleEdit}
      >
        {button ? "edit project " : "save changes"}
      </button>
    </div>
  );
}
