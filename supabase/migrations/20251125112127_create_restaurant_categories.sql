create table "public"."restaurant_categories" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null
      );

CREATE UNIQUE INDEX restaurant_categories_name_key ON public.restaurant_categories USING btree (name);

CREATE UNIQUE INDEX restaurant_categories_pkey ON public.restaurant_categories USING btree (id);

alter table "public"."restaurant_categories" add constraint "restaurant_categories_pkey" PRIMARY KEY using index "restaurant_categories_pkey";

alter table "public"."restaurant_categories" add constraint "restaurant_categories_name_key" UNIQUE using index "restaurant_categories_name_key";

grant delete on table "public"."restaurant_categories" to "anon";

grant insert on table "public"."restaurant_categories" to "anon";

grant references on table "public"."restaurant_categories" to "anon";

grant select on table "public"."restaurant_categories" to "anon";

grant trigger on table "public"."restaurant_categories" to "anon";

grant truncate on table "public"."restaurant_categories" to "anon";

grant update on table "public"."restaurant_categories" to "anon";

grant delete on table "public"."restaurant_categories" to "authenticated";

grant insert on table "public"."restaurant_categories" to "authenticated";

grant references on table "public"."restaurant_categories" to "authenticated";

grant select on table "public"."restaurant_categories" to "authenticated";

grant trigger on table "public"."restaurant_categories" to "authenticated";

grant truncate on table "public"."restaurant_categories" to "authenticated";

grant update on table "public"."restaurant_categories" to "authenticated";

grant delete on table "public"."restaurant_categories" to "postgres";

grant insert on table "public"."restaurant_categories" to "postgres";

grant references on table "public"."restaurant_categories" to "postgres";

grant select on table "public"."restaurant_categories" to "postgres";

grant trigger on table "public"."restaurant_categories" to "postgres";

grant truncate on table "public"."restaurant_categories" to "postgres";

grant update on table "public"."restaurant_categories" to "postgres";

grant delete on table "public"."restaurant_categories" to "service_role";

grant insert on table "public"."restaurant_categories" to "service_role";

grant references on table "public"."restaurant_categories" to "service_role";

grant select on table "public"."restaurant_categories" to "service_role";

grant trigger on table "public"."restaurant_categories" to "service_role";

grant truncate on table "public"."restaurant_categories" to "service_role";

grant update on table "public"."restaurant_categories" to "service_role";
