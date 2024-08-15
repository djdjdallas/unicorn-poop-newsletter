
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."idea_validations" (
    "id" bigint NOT NULL,
    "saas_idea_id" bigint,
    "category" "text",
    "content" "text",
    "order" integer
);

ALTER TABLE "public"."idea_validations" OWNER TO "postgres";

ALTER TABLE "public"."idea_validations" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."idea_validations_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."newsletter_issues" (
    "id" bigint NOT NULL,
    "title" "text",
    "description" "text",
    "content" "text",
    "published_at" timestamp with time zone,
    "slug" "text"
);

ALTER TABLE "public"."newsletter_issues" OWNER TO "postgres";

ALTER TABLE "public"."newsletter_issues" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."newsletter_issues_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."saas_ideas" (
    "id" bigint NOT NULL,
    "title" "text",
    "short_description" "text",
    "full_description" "text",
    "published_at" timestamp with time zone,
    "slug" "text"
);

ALTER TABLE "public"."saas_ideas" OWNER TO "postgres";

ALTER TABLE "public"."saas_ideas" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."saas_ideas_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE ONLY "public"."idea_validations"
    ADD CONSTRAINT "idea_validations_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."newsletter_issues"
    ADD CONSTRAINT "newsletter_issues_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."newsletter_issues"
    ADD CONSTRAINT "newsletter_issues_slug_key" UNIQUE ("slug");

ALTER TABLE ONLY "public"."saas_ideas"
    ADD CONSTRAINT "saas_ideas_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."saas_ideas"
    ADD CONSTRAINT "saas_ideas_slug_key" UNIQUE ("slug");

ALTER TABLE ONLY "public"."idea_validations"
    ADD CONSTRAINT "idea_validations_saas_idea_id_fkey" FOREIGN KEY ("saas_idea_id") REFERENCES "public"."saas_ideas"("id");

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."idea_validations" TO "anon";
GRANT ALL ON TABLE "public"."idea_validations" TO "authenticated";
GRANT ALL ON TABLE "public"."idea_validations" TO "service_role";

GRANT ALL ON SEQUENCE "public"."idea_validations_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."idea_validations_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."idea_validations_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."newsletter_issues" TO "anon";
GRANT ALL ON TABLE "public"."newsletter_issues" TO "authenticated";
GRANT ALL ON TABLE "public"."newsletter_issues" TO "service_role";

GRANT ALL ON SEQUENCE "public"."newsletter_issues_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."newsletter_issues_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."newsletter_issues_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."saas_ideas" TO "anon";
GRANT ALL ON TABLE "public"."saas_ideas" TO "authenticated";
GRANT ALL ON TABLE "public"."saas_ideas" TO "service_role";

GRANT ALL ON SEQUENCE "public"."saas_ideas_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."saas_ideas_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."saas_ideas_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
