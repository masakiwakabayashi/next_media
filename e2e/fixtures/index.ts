import { test as base } from '@playwright/test';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export { expect } from '@playwright/test';

type Cleanup = () => Promise<void>;

type TestFixtures = {
  supabaseAdmin: SupabaseClient;
  cleanup: (fn: Cleanup) => void;
};

export const test = base.extend<TestFixtures>({
  supabaseAdmin: async ({}, use) => {
    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    );
    await use(client);
  },

  cleanup: async ({}, use) => {
    const fns: Cleanup[] = [];
    await use((fn) => fns.push(fn));
    for (const fn of fns.reverse()) {
      await fn();
    }
  },
});
