"use client";

import { deleteProject, deleteTask } from "@/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function DeleteProject({ id }: { id: number }) {
  const router = useRouter();

  async function handleDelete() {
    try {
      await deleteProject(id);
      toast.success("delete successful")
    } catch (error) {
      console.error(error);
    }
    router.refresh();
    
  }

  return <button onClick={handleDelete}
  className="rounded border border-slate-200 text-slate-400 hover:bg-red-600 text-xs hover:text-gray-50 h-7 w-16">delete</button>;
}


export function DeleteTask({id}: {id:number}){
    const router = useRouter();

    async function handleDelete() {
        try {
          await deleteTask(id);
        } catch (error) {
          console.error(error);
        }
        router.refresh();
        toast.success("delete successful")
      }

      return <button onClick={handleDelete}
  className="rounded border border-slate-200 text-slate-400 hover:bg-red-600 text-xs hover:text-gray-50 h-7 w-16">delete</button>;

}
