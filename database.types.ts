export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
      Book: {
        Row: {
          author: string
          bookmarksCount: number
          categories: string[] | null
          commentsCount: number
          createdAt: string
          description: string | null
          googleBooksId: string | null
          googleBooksLink: string | null
          highlightsCount: number
          id: string
          imageUrl: string | null
          isbn10: string | null
          isbn13: string | null
          pageCount: number | null
          publishedDate: string | null
          subtitle: string | null
          textSnippet: string | null
          title: string
          updatedAt: string
          userId: string
        }
        Insert: {
          author: string
          bookmarksCount?: number
          categories?: string[] | null
          commentsCount?: number
          createdAt?: string
          description?: string | null
          googleBooksId?: string | null
          googleBooksLink?: string | null
          highlightsCount?: number
          id: string
          imageUrl?: string | null
          isbn10?: string | null
          isbn13?: string | null
          pageCount?: number | null
          publishedDate?: string | null
          subtitle?: string | null
          textSnippet?: string | null
          title: string
          updatedAt: string
          userId: string
        }
        Update: {
          author?: string
          bookmarksCount?: number
          categories?: string[] | null
          commentsCount?: number
          createdAt?: string
          description?: string | null
          googleBooksId?: string | null
          googleBooksLink?: string | null
          highlightsCount?: number
          id?: string
          imageUrl?: string | null
          isbn10?: string | null
          isbn13?: string | null
          pageCount?: number | null
          publishedDate?: string | null
          subtitle?: string | null
          textSnippet?: string | null
          title?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Book_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Highlight: {
        Row: {
          addedAt: string
          bookAuthor: string
          bookId: string
          bookTitle: string
          content: string
          createdAt: string
          id: string
          isFavorite: boolean
          location: string
          page: number
          updatedAt: string
          userId: string
        }
        Insert: {
          addedAt: string
          bookAuthor: string
          bookId: string
          bookTitle: string
          content: string
          createdAt?: string
          id: string
          isFavorite?: boolean
          location: string
          page: number
          updatedAt: string
          userId: string
        }
        Update: {
          addedAt?: string
          bookAuthor?: string
          bookId?: string
          bookTitle?: string
          content?: string
          createdAt?: string
          id?: string
          isFavorite?: boolean
          location?: string
          page?: number
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Highlight_bookId_fkey"
            columns: ["bookId"]
            isOneToOne: false
            referencedRelation: "Book"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Highlight_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      HighlightTag: {
        Row: {
          highlightId: string
          tagId: string
        }
        Insert: {
          highlightId: string
          tagId: string
        }
        Update: {
          highlightId?: string
          tagId?: string
        }
        Relationships: [
          {
            foreignKeyName: "HighlightTag_highlightId_fkey"
            columns: ["highlightId"]
            isOneToOne: false
            referencedRelation: "Highlight"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "HighlightTag_tagId_fkey"
            columns: ["tagId"]
            isOneToOne: false
            referencedRelation: "Tag"
            referencedColumns: ["id"]
          },
        ]
      }
      Note: {
        Row: {
          content: string
          createdAt: string
          highlightId: string
          id: string
          updatedAt: string
        }
        Insert: {
          content: string
          createdAt?: string
          highlightId: string
          id: string
          updatedAt: string
        }
        Update: {
          content?: string
          createdAt?: string
          highlightId?: string
          id?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Note_highlightId_fkey"
            columns: ["highlightId"]
            isOneToOne: false
            referencedRelation: "Highlight"
            referencedColumns: ["id"]
          },
        ]
      }
      SubHighlight: {
        Row: {
          createdAt: string
          endIndex: number
          highlightId: string
          id: string
          startIndex: number
        }
        Insert: {
          createdAt?: string
          endIndex: number
          highlightId: string
          id: string
          startIndex: number
        }
        Update: {
          createdAt?: string
          endIndex?: number
          highlightId?: string
          id?: string
          startIndex?: number
        }
        Relationships: [
          {
            foreignKeyName: "SubHighlight_highlightId_fkey"
            columns: ["highlightId"]
            isOneToOne: false
            referencedRelation: "Highlight"
            referencedColumns: ["id"]
          },
        ]
      }
      Tag: {
        Row: {
          createdAt: string
          id: string
          name: string
        }
        Insert: {
          createdAt?: string
          id: string
          name: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      User: {
        Row: {
          createdAt: string
          email: string
          id: string
          image: string | null
          name: string | null
          supabaseId: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          email: string
          id: string
          image?: string | null
          name?: string | null
          supabaseId: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          email?: string
          id?: string
          image?: string | null
          name?: string | null
          supabaseId?: string
          updatedAt?: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
