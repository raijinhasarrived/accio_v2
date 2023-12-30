export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      orders: {
        Row: {
          cargo: string | null;
          created_at: string;
          curr: string | null;
          date: string | null;
          details: string | null;
          from: string | null;
          id: number;
          owner: string | null;
          prepayment: boolean | null;
          price: string | null;
          roundtrip: boolean | null;
          status: string | null;
          to: string | null;
          userId: number | null;
        };
        Insert: {
          cargo?: string | null;
          created_at?: string;
          curr?: string | null;
          date?: string | null;
          details?: string | null;
          from?: string | null;
          id?: number;
          owner?: string | null;
          prepayment?: boolean | null;
          price?: string | null;
          roundtrip?: boolean | null;
          status?: string | null;
          to?: string | null;
          userId?: number | null;
        };
        Update: {
          cargo?: string | null;
          created_at?: string;
          curr?: string | null;
          date?: string | null;
          details?: string | null;
          from?: string | null;
          id?: number;
          owner?: string | null;
          prepayment?: boolean | null;
          price?: string | null;
          roundtrip?: boolean | null;
          status?: string | null;
          to?: string | null;
          userId?: number | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
