CREATE TYPE "public"."priority" AS ENUM('LOW', 'MEDIUM', 'HIGH');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('TODO', 'IN_PROGRESS', 'DONE');--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"priority" "priority" NOT NULL,
	"status" "status" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"due_date" timestamp with time zone,
	"assigned_to" varchar(255),
	"tags" jsonb,
	"estimated_hours" numeric(5, 2)
);
