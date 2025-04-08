import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with your actual values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zsnofjypqabqzbfmhvnx.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpzbm9manlwcWFicXpiZm1odm54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5Mzg3NjUsImV4cCI6MjA1NzUxNDc2NX0.bxuCEEEbzdy7WuyA6g73MIbhANsjhl6aGEJ4Dx5iAOA';

// Create a single supabase client for the entire app
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch article data by ID
 * @param {string} id - The article ID to fetch
 * @returns {Promise<Object>} - The article data or null if not found
 */
export async function getArticleById(id) {
  try {
    // Only fetch necessary fields for preview
    const { data, error } = await supabase
      .from('news')
      .select('id, title, summary, image_path, created_at, source_name')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export { supabase };