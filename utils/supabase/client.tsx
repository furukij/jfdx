import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// シングルトンパターンでSupabaseクライアントを作成
let supabaseClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClient(
      `https://${projectId}.supabase.co`,
      publicAnonKey
    );
  }
  return supabaseClient;
}
