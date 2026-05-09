export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      assessments: {
        Row: {
          completed_at: string
          data: Json
          id: string
          type: Database["public"]["Enums"]["assessment_type"]
          user_id: string
        }
        Insert: {
          completed_at?: string
          data?: Json
          id?: string
          type: Database["public"]["Enums"]["assessment_type"]
          user_id: string
        }
        Update: {
          completed_at?: string
          data?: Json
          id?: string
          type?: Database["public"]["Enums"]["assessment_type"]
          user_id?: string
        }
        Relationships: []
      }
      exercises: {
        Row: {
          day_id: string
          id: string
          name: string
          notes: string | null
          order_index: number
          reps: string
          rest_seconds: number
          sets: number
        }
        Insert: {
          day_id: string
          id?: string
          name: string
          notes?: string | null
          order_index?: number
          reps?: string
          rest_seconds?: number
          sets?: number
        }
        Update: {
          day_id?: string
          id?: string
          name?: string
          notes?: string | null
          order_index?: number
          reps?: string
          rest_seconds?: number
          sets?: number
        }
        Relationships: [
          {
            foreignKeyName: "exercises_day_id_fkey"
            columns: ["day_id"]
            isOneToOne: false
            referencedRelation: "workout_days"
            referencedColumns: ["id"]
          },
        ]
      }
      mood_logs: {
        Row: {
          created_at: string
          energy: number | null
          id: string
          mood: number
          notes: string | null
          stress: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          energy?: number | null
          id?: string
          mood: number
          notes?: string | null
          stress?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          energy?: number | null
          id?: string
          mood?: number
          notes?: string | null
          stress?: number | null
          user_id?: string
        }
        Relationships: []
      }
      nutrition_meals: {
        Row: {
          calories: number | null
          carbs_g: number | null
          created_at: string
          day_of_week: number
          fat_g: number | null
          id: string
          items: Json
          meal_type: Database["public"]["Enums"]["meal_type"]
          protein_g: number | null
          user_id: string
        }
        Insert: {
          calories?: number | null
          carbs_g?: number | null
          created_at?: string
          day_of_week: number
          fat_g?: number | null
          id?: string
          items?: Json
          meal_type: Database["public"]["Enums"]["meal_type"]
          protein_g?: number | null
          user_id: string
        }
        Update: {
          calories?: number | null
          carbs_g?: number | null
          created_at?: string
          day_of_week?: number
          fat_g?: number | null
          id?: string
          items?: Json
          meal_type?: Database["public"]["Enums"]["meal_type"]
          protein_g?: number | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          avatar_url: string | null
          created_at: string
          email: string | null
          fitness_level: Database["public"]["Enums"]["fitness_level"] | null
          full_name: string | null
          gender: string | null
          height: number | null
          id: string
          location: string | null
          main_goal: string | null
          phone: string | null
          preferred_time: string | null
          session_duration: string | null
          updated_at: string
          weight: number | null
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          fitness_level?: Database["public"]["Enums"]["fitness_level"] | null
          full_name?: string | null
          gender?: string | null
          height?: number | null
          id: string
          location?: string | null
          main_goal?: string | null
          phone?: string | null
          preferred_time?: string | null
          session_duration?: string | null
          updated_at?: string
          weight?: number | null
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          fitness_level?: Database["public"]["Enums"]["fitness_level"] | null
          full_name?: string | null
          gender?: string | null
          height?: number | null
          id?: string
          location?: string | null
          main_goal?: string | null
          phone?: string | null
          preferred_time?: string | null
          session_duration?: string | null
          updated_at?: string
          weight?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      workout_days: {
        Row: {
          day_number: number
          id: string
          is_rest: boolean
          name: string
          program_id: string
          week: number
        }
        Insert: {
          day_number: number
          id?: string
          is_rest?: boolean
          name: string
          program_id: string
          week?: number
        }
        Update: {
          day_number?: number
          id?: string
          is_rest?: boolean
          name?: string
          program_id?: string
          week?: number
        }
        Relationships: [
          {
            foreignKeyName: "workout_days_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "workout_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_logs: {
        Row: {
          completed_at: string
          day_id: string | null
          duration_minutes: number | null
          id: string
          notes: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string
          day_id?: string | null
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string
          day_id?: string | null
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_logs_day_id_fkey"
            columns: ["day_id"]
            isOneToOne: false
            referencedRelation: "workout_days"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_programs: {
        Row: {
          created_at: string
          days_per_week: number
          description: string | null
          id: string
          level: Database["public"]["Enums"]["fitness_level"]
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          days_per_week?: number
          description?: string | null
          id?: string
          level?: Database["public"]["Enums"]["fitness_level"]
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          days_per_week?: number
          description?: string | null
          id?: string
          level?: Database["public"]["Enums"]["fitness_level"]
          name?: string
          slug?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "user" | "trainer" | "nutritionist" | "admin"
      assessment_type: "psychological" | "physical"
      fitness_level: "beginner" | "intermediate" | "advanced"
      meal_type: "breakfast" | "lunch" | "dinner" | "snack"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["user", "trainer", "nutritionist", "admin"],
      assessment_type: ["psychological", "physical"],
      fitness_level: ["beginner", "intermediate", "advanced"],
      meal_type: ["breakfast", "lunch", "dinner", "snack"],
    },
  },
} as const
