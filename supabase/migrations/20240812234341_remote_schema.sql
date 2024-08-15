create table "public"."final_newsletter_issues" (
    "id" bigint generated always as identity not null,
    "title" text,
    "description" text,
    "content" text,
    "published_at" timestamp with time zone,
    "slug" text
);


CREATE UNIQUE INDEX final_newsletter_issues_pkey ON public.final_newsletter_issues USING btree (id);

CREATE UNIQUE INDEX final_newsletter_issues_slug_key ON public.final_newsletter_issues USING btree (slug);

alter table "public"."final_newsletter_issues" add constraint "final_newsletter_issues_pkey" PRIMARY KEY using index "final_newsletter_issues_pkey";

alter table "public"."final_newsletter_issues" add constraint "final_newsletter_issues_slug_key" UNIQUE using index "final_newsletter_issues_slug_key";

grant delete on table "public"."final_newsletter_issues" to "anon";

grant insert on table "public"."final_newsletter_issues" to "anon";

grant references on table "public"."final_newsletter_issues" to "anon";

grant select on table "public"."final_newsletter_issues" to "anon";

grant trigger on table "public"."final_newsletter_issues" to "anon";

grant truncate on table "public"."final_newsletter_issues" to "anon";

grant update on table "public"."final_newsletter_issues" to "anon";

grant delete on table "public"."final_newsletter_issues" to "authenticated";

grant insert on table "public"."final_newsletter_issues" to "authenticated";

grant references on table "public"."final_newsletter_issues" to "authenticated";

grant select on table "public"."final_newsletter_issues" to "authenticated";

grant trigger on table "public"."final_newsletter_issues" to "authenticated";

grant truncate on table "public"."final_newsletter_issues" to "authenticated";

grant update on table "public"."final_newsletter_issues" to "authenticated";

grant delete on table "public"."final_newsletter_issues" to "service_role";

grant insert on table "public"."final_newsletter_issues" to "service_role";

grant references on table "public"."final_newsletter_issues" to "service_role";

grant select on table "public"."final_newsletter_issues" to "service_role";

grant trigger on table "public"."final_newsletter_issues" to "service_role";

grant truncate on table "public"."final_newsletter_issues" to "service_role";

grant update on table "public"."final_newsletter_issues" to "service_role";


