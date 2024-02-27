"use server";

import { eq } from "drizzle-orm";
import { db } from "./db/connection";
import { projectsTable, tasksTable } from "./db/schema";

export async function getProjects() {
  return await db.select().from(projectsTable);
}

export async function getTasks(projectId: number) {
  return await db
    .select()
    .from(tasksTable)
    .where(eq(tasksTable.projectId, projectId));
}

export async function deleteProject(id: number) {
    await db.delete(tasksTable).where(eq(tasksTable.projectId, id));
  await db.delete(projectsTable).where(eq(projectsTable.id, id));
  
}

export async function deleteTask(id: number) {
  await db.delete(tasksTable).where(eq(tasksTable.id, id));
}

export async function addProject({
  name,
  deadline,
}: {
  name: string;
  deadline: string;
}) {
  await db.insert(projectsTable).values({ name, deadline });
}

export async function editProject({id, name, deadline}: {id: number, name: string, deadline: string}){
    await db.update(projectsTable).set({name, deadline}).where(eq(projectsTable.id, id))
}


export async function addTask({
  projectId,
  description,
  status,
}: {
  projectId: number;
  description: string;
  status: "pending" | "complete";
}) {
  await db.insert(tasksTable).values({ projectId, description, status });
}
