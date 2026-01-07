-- Seed data for public.restaurant_tags
truncate table public.restaurant_tags restart identity cascade;

insert into public.restaurant_tags (id, restaurant_id, tag_id) values
  (
    '99999999-9999-9999-9999-999999999991',
    '11111111-1111-1111-1111-111111111111',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
  ),
  (
    'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeee1',
    '22222222-2222-2222-2222-222222222222',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
  ),
  (
    'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeee2',
    '33333333-3333-3333-3333-333333333333',
    'cccccccc-cccc-cccc-cccc-cccccccccccc'
  ),
  (
    'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeee3',
    '33333333-3333-3333-3333-333333333333',
    'dddddddd-dddd-dddd-dddd-dddddddddddd'
  )
on conflict (restaurant_id, tag_id) do nothing;
