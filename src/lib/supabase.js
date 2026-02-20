import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sgsslciogmibstahtbpi.supabase.co'
// Используем именно NEXT_PUBLIC, иначе браузер не увидит ключ
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)