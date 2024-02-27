"use server";

import { getProjects, getTasks } from "@/actions";
import AddTask from "@/components/AddTask";
import { TaskCard } from "@/components/Cards";
import EditProject from "@/components/EditProject";
import { redirect } from "next/navigation";

export type ProjectPageParams = {
  params: { projectId: string };
};

export default async function projectPage({
  params: { projectId },
}: ProjectPageParams) {
  const projects = await getProjects();
  const project = projects.find((project) => project.id === Number(projectId));

  if (project === undefined) {
    redirect("/project/error");
  }

  const tasks = await getTasks(Number(projectId));

  return (
    <main className="p-24">
      <h1 className="font-bold text-4xl text-center m-10">{project.name}</h1>
      <p> due to: {new Date(project.deadline).toISOString().split("T")[0]}</p>
      <EditProject project={project} />
      <div id="tasks" className="p-10">
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task}></TaskCard>
        ))}
        <AddTask projectId={Number(projectId)} />
      </div>
      
    </main>
  );
}
