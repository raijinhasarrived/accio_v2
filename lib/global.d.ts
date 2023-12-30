import type { Database as DB } from "./db.types";

declare global {
  type Database = DB;
  type Order = DB["public"]["Tables"]["orders"]["Row"];
}
