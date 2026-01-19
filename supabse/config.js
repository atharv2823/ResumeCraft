import { createClient } from '@supabase/supabase-js';

// Mock Supabase client if keys are missing
const mockSupabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ data: { user: { id: 'mock' } }, error: null }),
    signOut: async () => ({ error: null }),
    signUp: async () => ({ data: { user: { id: 'mock' } }, error: null }),
    signInWithOAuth: async () => ({ data: {}, error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: {}, error: null }),
        maybeSingle: async () => ({ data: {}, error: null }),
      }),
      order: () => ({ limit: async () => ({ data: [], error: null }) }),
    }),
    update: () => ({
      eq: async () => ({ data: {}, error: null })
    }),
    insert: async () => ({ data: {}, error: null }),
  }),
};

let supabase = mockSupabase;

// Only try to create real client if keys exist, OR if we are strictly bypassing we might just want to use the mock.
// The user said "remove ... database connection".
// So let's force the mock or make it very safe.
// Force mock client for now as per user request to remove DB connection
// try {
//   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
//   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
//
//   if (supabaseUrl && supabaseAnonKey) {
//      supabase = createClient(supabaseUrl, supabaseAnonKey, {
//       auth: {
//         persistSession: true,
//         autoRefreshToken: true,
//         detectSessionInUrl: true
//       }
//     });
//   } else {
//     console.warn("Supabase credentials missing, using mock client");
//   }
// } catch (e) {
//   console.warn("Error initializing Supabase, using mock client", e);
// }


export default supabase;

// Helper function to get user profile
export async function getUserProfile(userId) {
  // Return mock data
  return {
    id: userId,
    first_name: 'Demo',
    last_name: 'User',
    email: 'demo@resumecraft.com'
  };
}

// Helper function to update user profile
export async function updateUserProfile(userId, updates) {
  return updates;
}