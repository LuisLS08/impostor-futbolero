import { createClient } from '@supabase/supabase-js'

// Tu URL limpia de Supabase
const supabaseUrl = 'https://slkkbtlgjhesahcdueyo.supabase.co'

// Aquí debes pegar el código gigante (anon / public) que estaba justo abajo de la URL en la web
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsa2tidGxnamhlc2FoY2R1ZXlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNDc4MTEsImV4cCI6MjA5ODgyMzgxMX0.evR7J3--vHKmQp0yr0JkEbw_MvJMUfJxFTYQbpeGhzE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)