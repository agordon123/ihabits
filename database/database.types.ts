export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          createdAt: string
          description: string | null
          endTime: string | null
          id: string
          startTime: string
          title: string
          userId: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          endTime?: string | null
          id: string
          startTime: string
          title: string
          userId: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          endTime?: string | null
          id?: string
          startTime?: string
          title?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      habits: {
        Row: {
          createdAt: string
          description: string | null
          id: string
          title: string
          userId: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          id: string
          title: string
          userId: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          id?: string
          title?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "habits_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      journal_entries: {
        Row: {
          content: string
          createdAt: string
          id: string
          userId: string
        }
        Insert: {
          content: string
          createdAt?: string
          id: string
          userId: string
        }
        Update: {
          content?: string
          createdAt?: string
          id?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "journal_entries_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reminder_times: {
        Row: {
          habitId: string
          id: string
          time: string
        }
        Insert: {
          habitId: string
          id: string
          time: string
        }
        Update: {
          habitId?: string
          id?: string
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "reminder_times_habitId_fkey"
            columns: ["habitId"]
            isOneToOne: false
            referencedRelation: "habits"
            referencedColumns: ["id"]
          }
        ]
      }
      tasks: {
        Row: {
          completed: boolean
          createdAt: string
          description: string | null
          dueDate: string
          id: string
          title: string
          userId: string
        }
        Insert: {
          completed?: boolean
          createdAt?: string
          description?: string | null
          dueDate: string
          id: string
          title: string
          userId: string
        }
        Update: {
          completed?: boolean
          createdAt?: string
          description?: string | null
          dueDate?: string
          id?: string
          title?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          appleId: string | null
          avatar_url: string | null
          createdAt: string
          email: string
          githubId: string | null
          googleId: string | null
          id: string
          name: string | null
          provider: string | null
          updatedAt: string | null
        }
        Insert: {
          appleId?: string | null
          avatar_url?: string | null
          createdAt?: string
          email: string
          githubId?: string | null
          googleId?: string | null
          id: string
          name?: string | null
          provider?: string | null
          updatedAt?: string | null
        }
        Update: {
          appleId?: string | null
          avatar_url?: string | null
          createdAt?: string
          email?: string
          githubId?: string | null
          googleId?: string | null
          id?: string
          name?: string | null
          provider?: string | null
          updatedAt?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
