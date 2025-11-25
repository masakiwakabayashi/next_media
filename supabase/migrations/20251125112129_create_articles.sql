create table "public"."articles" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "slug" text not null,
    "thumbnail_url" text,
    "content" text,
    "author_id" uuid not null,
    "published_at" timestamp with time zone,
    "status" text not null default 'draft'::text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );

CREATE UNIQUE INDEX articles_pkey ON public.articles USING btree (id);

CREATE UNIQUE INDEX articles_slug_key ON public.articles USING btree (slug);

CREATE INDEX idx_articles_author_id ON public.articles USING btree (author_id);

CREATE INDEX idx_articles_published_at ON public.articles USING btree (published_at);

alter table "public"."articles" add constraint "articles_pkey" PRIMARY KEY using index "articles_pkey";

alter table "public"."articles" add constraint "articles_author_id_fkey" FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE RESTRICT not valid;

alter table "public"."articles" validate constraint "articles_author_id_fkey";

alter table "public"."articles" add constraint "articles_slug_key" UNIQUE using index "articles_slug_key";

grant delete on table "public"."articles" to "anon";

grant insert on table "public"."articles" to "anon";

grant references on table "public"."articles" to "anon";

grant select on table "public"."articles" to "anon";

grant trigger on table "public"."articles" to "anon";

grant truncate on table "public"."articles" to "anon";

grant update on table "public"."articles" to "anon";

grant delete on table "public"."articles" to "authenticated";

grant insert on table "public"."articles" to "authenticated";

grant references on table "public"."articles" to "authenticated";

grant select on table "public"."articles" to "authenticated";

grant trigger on table "public"."articles" to "authenticated";

grant truncate on table "public"."articles" to "authenticated";

grant update on table "public"."articles" to "authenticated";

grant delete on table "public"."articles" to "postgres";

grant insert on table "public"."articles" to "postgres";

grant references on table "public"."articles" to "postgres";

grant select on table "public"."articles" to "postgres";

grant trigger on table "public"."articles" to "postgres";

grant truncate on table "public"."articles" to "postgres";

grant update on table "public"."articles" to "postgres";

grant delete on table "public"."articles" to "service_role";

grant insert on table "public"."articles" to "service_role";

grant references on table "public"."articles" to "service_role";

grant select on table "public"."articles" to "service_role";

grant trigger on table "public"."articles" to "service_role";

grant truncate on table "public"."articles" to "service_role";

grant update on table "public"."articles" to "service_role";
