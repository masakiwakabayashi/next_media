create table "public"."article_tag_relations" (
    "id" uuid not null default gen_random_uuid(),
    "article_id" uuid not null,
    "tag_id" uuid not null
      );

CREATE UNIQUE INDEX article_tag_relations_pkey ON public.article_tag_relations USING btree (id);

CREATE INDEX idx_article_tag_relations_article_id ON public.article_tag_relations USING btree (article_id);

CREATE INDEX idx_article_tag_relations_tag_id ON public.article_tag_relations USING btree (tag_id);

CREATE UNIQUE INDEX uniq_article_tag_relations_article_tag ON public.article_tag_relations USING btree (article_id, tag_id);

alter table "public"."article_tag_relations" add constraint "article_tag_relations_pkey" PRIMARY KEY using index "article_tag_relations_pkey";

alter table "public"."article_tag_relations" add constraint "article_tag_relations_article_id_fkey" FOREIGN KEY (article_id) REFERENCES public.articles(id) ON DELETE CASCADE not valid;

alter table "public"."article_tag_relations" validate constraint "article_tag_relations_article_id_fkey";

alter table "public"."article_tag_relations" add constraint "article_tag_relations_tag_id_fkey" FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON DELETE CASCADE not valid;

alter table "public"."article_tag_relations" validate constraint "article_tag_relations_tag_id_fkey";

grant delete on table "public"."article_tag_relations" to "anon";

grant insert on table "public"."article_tag_relations" to "anon";

grant references on table "public"."article_tag_relations" to "anon";

grant select on table "public"."article_tag_relations" to "anon";

grant trigger on table "public"."article_tag_relations" to "anon";

grant truncate on table "public"."article_tag_relations" to "anon";

grant update on table "public"."article_tag_relations" to "anon";

grant delete on table "public"."article_tag_relations" to "authenticated";

grant insert on table "public"."article_tag_relations" to "authenticated";

grant references on table "public"."article_tag_relations" to "authenticated";

grant select on table "public"."article_tag_relations" to "authenticated";

grant trigger on table "public"."article_tag_relations" to "authenticated";

grant truncate on table "public"."article_tag_relations" to "authenticated";

grant update on table "public"."article_tag_relations" to "authenticated";

grant delete on table "public"."article_tag_relations" to "postgres";

grant insert on table "public"."article_tag_relations" to "postgres";

grant references on table "public"."article_tag_relations" to "postgres";

grant select on table "public"."article_tag_relations" to "postgres";

grant trigger on table "public"."article_tag_relations" to "postgres";

grant truncate on table "public"."article_tag_relations" to "postgres";

grant update on table "public"."article_tag_relations" to "postgres";

grant delete on table "public"."article_tag_relations" to "service_role";

grant insert on table "public"."article_tag_relations" to "service_role";

grant references on table "public"."article_tag_relations" to "service_role";

grant select on table "public"."article_tag_relations" to "service_role";

grant trigger on table "public"."article_tag_relations" to "service_role";

grant truncate on table "public"."article_tag_relations" to "service_role";

grant update on table "public"."article_tag_relations" to "service_role";
