import { NextResponse } from 'next/server';
import supabase from '@/supabse/config';

export async function GET(request) {
  try {
    // Get the hash fragment from the URL
    const requestUrl = new URL(request.url);
    const hashFragment = requestUrl.hash;

    if (hashFragment) {
      // Exchange the token from the hash fragment
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;

      if (session?.user) {
        // Check if profile exists
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (!profile) {
          // Create new profile if it doesn't exist
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([
              {
                id: session.user.id,
                email: session.user.email,
                first_name: session.user.user_metadata?.given_name || '',
                last_name: session.user.user_metadata?.family_name || '',
                avatar_url: session.user.user_metadata?.picture || ''
              }
            ]);

          if (insertError) throw insertError;
        }
      }
    }

    // Redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    console.error('Auth callback error:', error);
    // Redirect to login page with error
    return NextResponse.redirect(
      new URL('/login?error=Authentication failed', request.url)
    );
  }
}