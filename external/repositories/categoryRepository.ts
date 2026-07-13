import { supabase } from '@/lib/supabase/client'

export type Category = {
  id: string
  name: string
  slug: string
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug')
    .order('name')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return (data as Category[]) || []
}
