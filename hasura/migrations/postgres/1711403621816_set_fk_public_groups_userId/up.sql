alter table "public"."groups" drop constraint "groups_userId_fkey",
  add constraint "groups_userId_fkey"
  foreign key ("userId")
  references "public"."users"
  ("id") on update restrict on delete restrict;
