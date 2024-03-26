CREATE TABLE "public"."groups" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "equb_type" text NOT NULL, "amount" integer NOT NULL, "member" integer NOT NULL, "status" text NOT NULL, "complate" boolean NOT NULL, "userId" uuid NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
