insert into public.restaurant_tags (id, restaurant_id, tag_id) values
  (
    'a4edf1df-ec79-4f73-8cce-05a32a1a58df',
    '9b3c7e63-221b-4f7c-98b0-3f857c114c8a',
    'fea341c8-78c9-4f44-9893-2af9efc47adc'
  ),
  (
    '4e72c75a-1f4d-4e72-9d57-b086e4040f60',
    '9b3c7e63-221b-4f7c-98b0-3f857c114c8a',
    'f4478b4d-ec2b-4a46-9f52-c293e2ca9d7a'
  ),
  (
    '52c1a0f0-7f4c-4c9a-8b3b-3572d85f3d1b',
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    'c8f1bb13-3ffb-4d7a-a5f6-df5c8a7fb87d'
  ),
  (
    '97e68fd1-8e7e-41af-86aa-0c1aeb60932d',
    'e4f1dbe2-f05b-4c46-b0b1-83515a69f8da',
    'd6338d68-9a97-459d-8c7a-772316bed112'
  ),
  (
    '5d3c4dc3-a381-4b09-9a6e-7c2d8b8fe329',
    'b1d3594e-1c53-4482-b7bd-9bab7c56a1fa',
    '09d42d75-7b6f-4cb3-bdf1-1f9c6dbd6b5a'
  )
on conflict (restaurant_id, tag_id) do nothing;
