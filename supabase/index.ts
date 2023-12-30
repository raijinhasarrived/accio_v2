import { Database } from "@/lib/db.types";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient<Database>(
  "https://qtcpgpzyileqkvoyqevv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Y3BncHp5aWxlcWt2b3lxZXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc1MDc4MTksImV4cCI6MjAxMzA4MzgxOX0.CTfJGFj7kOGQRAmIFORpnI0lsWnpYmvyUKvMa1IEkdQ",
);
