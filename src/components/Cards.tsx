import { Project, Task } from "@/db/schema";
import { DeleteProject, DeleteTask } from "./Delete";
import Link from "next/link";

export function ProjectCard({ project }: { project: Project }) {
  const due = String(project.deadline).split("01")[0];

  return (
    <div className="rounded border m-3 hover:shadow-lg p-5">
      <DeleteProject id={project.id} />
      <Link href={`./project/${project.id}`}>
        <h3 className="font-bold text-xl my-5">{project.name}</h3>
      </Link>

      <p className="text-gray-300">due {due}</p>
    </div>
  );
}


export function TaskCard({ id, description, status }: { id: number, description: string, status:string }) {

  return (
    <div className="rounded border m-3 hover:shadow-lg p-5">
        <DeleteTask id={id} />
      <h3>{description}</h3>
      <p>{status}</p>
    </div>
  );
}
