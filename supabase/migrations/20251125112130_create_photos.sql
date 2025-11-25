create table "public"."photos" (
    "id" uuid not null default gen_random_uuid(),
    "type" text not null,
    "target_id" uuid not null,
    "image_url" text not null,
    "caption" text,
    "sort_order" integer default 0,
    "created_at" timestamp with time zone not null default now()
      );

CREATE INDEX idx_photos_type_target_id ON public.photos USING btree (type, target_id);

CREATE UNIQUE INDEX photos_pkey ON public.photos USING btree (id);

alter table "public"."photos" add constraint "photos_pkey" PRIMARY KEY using index "photos_pkey";

grant delete on table "public"."photos" to "anon";

grant insert on table "public"."photos" to "anon";

grant references on table "public"."photos" to "anon";

grant select on table "public"."photos" to "anon";

grant trigger on table "public"."photos" to "anon";

grant truncate on table "public"."photos" to "anon";

grant update on table "public"."photos" to "anon";

grant delete on table "public"."photos" to "authenticated";

grant insert on table "public"."photos" to "authenticated";

grant references on table "public"."photos" to "authenticated";

grant select on table "public"."photos" to "authenticated";

grant trigger on table "public"."photos" to "authenticated";

grant truncate on table "public"."photos" to "authenticated";

grant update on table "public"."photos" to "authenticated";

grant delete on table "public"."photos" to "postgres";

grant insert on table "public"."photos" to "postgres";

grant references on table "public"."photos" to "postgres";

grant select on table "public"."photos" to "postgres";

grant trigger on table "public"."photos" to "postgres";

grant truncate on table "public"."photos" to "postgres";

grant update on table "public"."photos" to "postgres";

grant delete on table "public"."photos" to "service_role";

grant insert on table "public"."photos" to "service_role";

grant references on table "public"."photos" to "service_role";

grant select on table "public"."photos" to "service_role";

grant trigger on table "public"."photos" to "service_role";

grant truncate on table "public"."photos" to "service_role";

grant update on table "public"."photos" to "service_role";
