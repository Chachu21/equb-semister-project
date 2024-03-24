CREATE TABLE "public"."comment" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "full_name" text NOT NULL, "email" text NOT NULL, "rate" numeric NOT NULL, "content" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
