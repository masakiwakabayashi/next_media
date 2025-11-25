create table "public"."review_likes" (
    "id" uuid not null default gen_random_uuid(),
    "review_id" uuid not null,
    "user_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
      );

CREATE INDEX idx_review_likes_review_id ON public.review_likes USING btree (review_id);

CREATE INDEX idx_review_likes_user_id ON public.review_likes USING btree (user_id);

CREATE UNIQUE INDEX review_likes_pkey ON public.review_likes USING btree (id);

CREATE UNIQUE INDEX uniq_review_likes_review_user ON public.review_likes USING btree (review_id, user_id);

alter table "public"."review_likes" add constraint "review_likes_pkey" PRIMARY KEY using index "review_likes_pkey";

alter table "public"."review_likes" add constraint "review_likes_review_id_fkey" FOREIGN KEY (review_id) REFERENCES public.reviews(id) ON DELETE CASCADE not valid;

alter table "public"."review_likes" validate constraint "review_likes_review_id_fkey";

alter table "public"."review_likes" add constraint "review_likes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE not valid;

alter table "public"."review_likes" validate constraint "review_likes_user_id_fkey";

grant delete on table "public"."review_likes" to "anon";

grant insert on table "public"."review_likes" to "anon";

grant references on table "public"."review_likes" to "anon";

grant select on table "public"."review_likes" to "anon";

grant trigger on table "public"."review_likes" to "anon";

grant truncate on table "public"."review_likes" to "anon";

grant update on table "public"."review_likes" to "anon";

grant delete on table "public"."review_likes" to "authenticated";

grant insert on table "public"."review_likes" to "authenticated";

grant references on table "public"."review_likes" to "authenticated";

grant select on table "public"."review_likes" to "authenticated";

grant trigger on table "public"."review_likes" to "authenticated";

grant truncate on table "public"."review_likes" to "authenticated";

grant update on table "public"."review_likes" to "authenticated";

grant delete on table "public"."review_likes" to "postgres";

grant insert on table "public"."review_likes" to "postgres";

grant references on table "public"."review_likes" to "postgres";

grant select on table "public"."review_likes" to "postgres";

grant trigger on table "public"."review_likes" to "postgres";

grant truncate on table "public"."review_likes" to "postgres";

grant update on table "public"."review_likes" to "postgres";

grant delete on table "public"."review_likes" to "service_role";

grant insert on table "public"."review_likes" to "service_role";

grant references on table "public"."review_likes" to "service_role";

grant select on table "public"."review_likes" to "service_role";

grant trigger on table "public"."review_likes" to "service_role";

grant truncate on table "public"."review_likes" to "service_role";

grant update on table "public"."review_likes" to "service_role";
