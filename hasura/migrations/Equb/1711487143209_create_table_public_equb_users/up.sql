CREATE TABLE "public"."equb_users" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "full_name" text NOT NULL, "email" text NOT NULL, "phone_no" text NOT NULL, "password" text NOT NULL, "agreedTerms" boolean NOT NULL DEFAULT false, PRIMARY KEY ("id") , UNIQUE ("id"), UNIQUE ("email"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
