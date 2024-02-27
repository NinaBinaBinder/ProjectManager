import { getProjects } from "@/actions";
import AddProject from "@/components/AddProject";
import { ProjectCard } from "@/components/Cards";
import { DeleteProject } from "@/components/Delete";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="p-24">
      <h1 className="font-bold text-4xl text-center m-10">Project Manager</h1>

      <div>
        {projects.map((project)=>
        <>
        <ProjectCard project={project}></ProjectCard>
        </>
        )}
      </div>
      <AddProject></AddProject>
    </main>
  );
}
