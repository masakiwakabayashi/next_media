create table "public"."restaurant_category_relations" (
    "id" uuid not null default gen_random_uuid(),
    "restaurant_id" uuid not null,
    "category_id" uuid not null
      );

CREATE INDEX idx_restaurant_category_relations_category_id ON public.restaurant_category_relations USING btree (category_id);

CREATE INDEX idx_restaurant_category_relations_restaurant_id ON public.restaurant_category_relations USING btree (restaurant_id);

CREATE UNIQUE INDEX restaurant_category_relations_pkey ON public.restaurant_category_relations USING btree (id);

CREATE UNIQUE INDEX uniq_restaurant_category_relations_restaurant_category ON public.restaurant_category_relations USING btree (restaurant_id, category_id);

alter table "public"."restaurant_category_relations" add constraint "restaurant_category_relations_pkey" PRIMARY KEY using index "restaurant_category_relations_pkey";

alter table "public"."restaurant_category_relations" add constraint "restaurant_category_relations_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public.restaurant_categories(id) ON DELETE CASCADE not valid;

alter table "public"."restaurant_category_relations" validate constraint "restaurant_category_relations_category_id_fkey";

alter table "public"."restaurant_category_relations" add constraint "restaurant_category_relations_restaurant_id_fkey" FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id) ON DELETE CASCADE not valid;

alter table "public"."restaurant_category_relations" validate constraint "restaurant_category_relations_restaurant_id_fkey";

grant delete on table "public"."restaurant_category_relations" to "anon";

grant insert on table "public"."restaurant_category_relations" to "anon";

grant references on table "public"."restaurant_category_relations" to "anon";

grant select on table "public"."restaurant_category_relations" to "anon";

grant trigger on table "public"."restaurant_category_relations" to "anon";

grant truncate on table "public"."restaurant_category_relations" to "anon";

grant update on table "public"."restaurant_category_relations" to "anon";

grant delete on table "public"."restaurant_category_relations" to "authenticated";

grant insert on table "public"."restaurant_category_relations" to "authenticated";

grant references on table "public"."restaurant_category_relations" to "authenticated";

grant select on table "public"."restaurant_category_relations" to "authenticated";

grant trigger on table "public"."restaurant_category_relations" to "authenticated";

grant truncate on table "public"."restaurant_category_relations" to "authenticated";

grant update on table "public"."restaurant_category_relations" to "authenticated";

grant delete on table "public"."restaurant_category_relations" to "postgres";

grant insert on table "public"."restaurant_category_relations" to "postgres";

grant references on table "public"."restaurant_category_relations" to "postgres";

grant select on table "public"."restaurant_category_relations" to "postgres";

grant trigger on table "public"."restaurant_category_relations" to "postgres";

grant truncate on table "public"."restaurant_category_relations" to "postgres";

grant update on table "public"."restaurant_category_relations" to "postgres";

grant delete on table "public"."restaurant_category_relations" to "service_role";

grant insert on table "public"."restaurant_category_relations" to "service_role";

grant references on table "public"."restaurant_category_relations" to "service_role";

grant select on table "public"."restaurant_category_relations" to "service_role";

grant trigger on table "public"."restaurant_category_relations" to "service_role";

grant truncate on table "public"."restaurant_category_relations" to "service_role";

grant update on table "public"."restaurant_category_relations" to "service_role";
