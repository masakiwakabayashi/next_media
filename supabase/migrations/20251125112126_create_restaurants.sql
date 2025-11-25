create table "public"."restaurants" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "description" text,
    "prefecture" text,
    "address" text,
    "latitude" double precision,
    "longitude" double precision,
    "phone" text,
    "website_url" text,
    "business_hours" jsonb,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );

CREATE INDEX idx_restaurants_prefecture ON public.restaurants USING btree (prefecture);

CREATE UNIQUE INDEX restaurants_pkey ON public.restaurants USING btree (id);

alter table "public"."restaurants" add constraint "restaurants_pkey" PRIMARY KEY using index "restaurants_pkey";

grant delete on table "public"."restaurants" to "anon";

grant insert on table "public"."restaurants" to "anon";

grant references on table "public"."restaurants" to "anon";

grant select on table "public"."restaurants" to "anon";

grant trigger on table "public"."restaurants" to "anon";

grant truncate on table "public"."restaurants" to "anon";

grant update on table "public"."restaurants" to "anon";

grant delete on table "public"."restaurants" to "authenticated";

grant insert on table "public"."restaurants" to "authenticated";

grant references on table "public"."restaurants" to "authenticated";

grant select on table "public"."restaurants" to "authenticated";

grant trigger on table "public"."restaurants" to "authenticated";

grant truncate on table "public"."restaurants" to "authenticated";

grant update on table "public"."restaurants" to "authenticated";

grant delete on table "public"."restaurants" to "postgres";

grant insert on table "public"."restaurants" to "postgres";

grant references on table "public"."restaurants" to "postgres";

grant select on table "public"."restaurants" to "postgres";

grant trigger on table "public"."restaurants" to "postgres";

grant truncate on table "public"."restaurants" to "postgres";

grant update on table "public"."restaurants" to "postgres";

grant delete on table "public"."restaurants" to "service_role";

grant insert on table "public"."restaurants" to "service_role";

grant references on table "public"."restaurants" to "service_role";

grant select on table "public"."restaurants" to "service_role";

grant trigger on table "public"."restaurants" to "service_role";

grant truncate on table "public"."restaurants" to "service_role";

grant update on table "public"."restaurants" to "service_role";
