create sequence "public"."newsletters_id_seq";

create table "public"."newsletters" (
    "id" integer not null default nextval('newsletters_id_seq'::regclass),
    "title" text not null,
    "description" text,
    "content" text,
    "published_at" timestamp with time zone,
    "slug" text
);


alter sequence "public"."newsletters_id_seq" owned by "public"."newsletters"."id";

CREATE UNIQUE INDEX newsletters_pkey ON public.newsletters USING btree (id);

CREATE UNIQUE INDEX newsletters_slug_key ON public.newsletters USING btree (slug);

alter table "public"."newsletters" add constraint "newsletters_pkey" PRIMARY KEY using index "newsletters_pkey";

alter table "public"."newsletters" add constraint "newsletters_slug_key" UNIQUE using index "newsletters_slug_key";

grant delete on table "public"."newsletters" to "anon";

grant insert on table "public"."newsletters" to "anon";

grant references on table "public"."newsletters" to "anon";

grant select on table "public"."newsletters" to "anon";

grant trigger on table "public"."newsletters" to "anon";

grant truncate on table "public"."newsletters" to "anon";

grant update on table "public"."newsletters" to "anon";

grant delete on table "public"."newsletters" to "authenticated";

grant insert on table "public"."newsletters" to "authenticated";

grant references on table "public"."newsletters" to "authenticated";

grant select on table "public"."newsletters" to "authenticated";

grant trigger on table "public"."newsletters" to "authenticated";

grant truncate on table "public"."newsletters" to "authenticated";

grant update on table "public"."newsletters" to "authenticated";

grant delete on table "public"."newsletters" to "service_role";

grant insert on table "public"."newsletters" to "service_role";

grant references on table "public"."newsletters" to "service_role";

grant select on table "public"."newsletters" to "service_role";

grant trigger on table "public"."newsletters" to "service_role";

grant truncate on table "public"."newsletters" to "service_role";

grant update on table "public"."newsletters" to "service_role";


