"use client";

import { addTask } from "@/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddTask({ projectId }: { projectId: number }) {
  const [description, setDesc] = useState("");
  const [state, setState] = useState(false);

  const router = useRouter();



  async function handleAdd() {
    if (description.length < 4) {
      return toast.error("please enter valid task");
    } else {
      try {
        await addTask({ projectId, description, status: state? "pending" : "complete" });
      } catch (error) {
        console.error(error);
      }
    }
    router.refresh();
  }

  return (
    <form className="flex flex-col rounded border m-3 bg-blue-200 p-3 w-1/2">
      <input
        onChange={(e) => setDesc(e.currentTarget.value)}
        type="text"
        className="m-2 rounded p-2"
        placeholder="task description"
      />
      <div className="m-2">
        <input
          type="checkbox"
          id="status"
          onChange={() => setState(!state)}
        />
        <label className="p-2" htmlFor="status">done</label>
      </div>

      <button
        type="button"
        className="rounded bg-blue-500 hover:bg-blue-600 p-2 my-5 text-gray-50 m-auto"
        onClick={handleAdd}
      >
        add task
      </button>
    </form>
  );
}
