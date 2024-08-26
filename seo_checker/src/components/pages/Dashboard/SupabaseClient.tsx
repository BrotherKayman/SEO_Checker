import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sotdpuatlgvlqcqwzhgo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvdGRwdWF0bGd2bHFjcXd6aGdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQzMTQ4NzAsImV4cCI6MjAzOTg5MDg3MH0.FLWnH3usl_1IyVKhnF7dXqB60Zjcu1bsDh2oJNW_GMk'; // 

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);


