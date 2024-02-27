DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('pending', 'complete');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projectsTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"deadline" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasksTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" varchar(200) NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"projectId" serial NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasksTable" ADD CONSTRAINT "tasksTable_projectId_projectsTable_id_fk" FOREIGN KEY ("projectId") REFERENCES "projectsTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
