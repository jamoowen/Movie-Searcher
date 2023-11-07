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
      actors: {
        Row: {
          birthYear: number
          knownFor: string
          nconst: string
          primaryName: string
          titlesTconst: string | null
        }
        Insert: {
          birthYear: number
          knownFor: string
          nconst: string
          primaryName: string
          titlesTconst?: string | null
        }
        Update: {
          birthYear?: number
          knownFor?: string
          nconst?: string
          primaryName?: string
          titlesTconst?: string | null
        }
        Relationships: []
      }
      directors: {
        Row: {
          birthYear: number
          dirconst: string
          knownFor: string
          primaryName: string
          titlesTconst: string
        }
        Insert: {
          birthYear: number
          dirconst: string
          knownFor: string
          primaryName: string
          titlesTconst: string
        }
        Update: {
          birthYear?: number
          dirconst?: string
          knownFor?: string
          primaryName?: string
          titlesTconst?: string
        }
        Relationships: []
      }
      movies: {
        Row: {
          averageRating: number
          cast: string
          castNconst: string
          dirconst: string
          director: string
          genres: string
          primaryTitle: string
          runtimeMinutes: number
          startYear: number
          tconst: string
        }
        Insert: {
          averageRating: number
          cast: string
          castNconst: string
          dirconst: string
          director: string
          genres: string
          primaryTitle: string
          runtimeMinutes: number
          startYear: number
          tconst: string
        }
        Update: {
          averageRating?: number
          cast?: string
          castNconst?: string
          dirconst?: string
          director?: string
          genres?: string
          primaryTitle?: string
          runtimeMinutes?: number
          startYear?: number
          tconst?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatarUrl: string | null
          name: string | null
          user_id: string
        }
        Insert: {
          avatarUrl?: string | null
          name?: string | null
          user_id: string
        }
        Update: {
          avatarUrl?: string | null
          name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      watchlist: {
        Row: {
          averageRating: number
          cast: string
          castNconst: string
          dirconst: string
          director: string
          genres: string
          id: number
          primaryTitle: string
          runtimeMinutes: number
          startYear: number
          tconst: string
          user_id: string
        }
        Insert: {
          averageRating: number
          cast: string
          castNconst: string
          dirconst: string
          director: string
          genres: string
          id?: number
          primaryTitle: string
          runtimeMinutes: number
          startYear: number
          tconst: string
          user_id: string
        }
        Update: {
          averageRating?: number
          cast?: string
          castNconst?: string
          dirconst?: string
          director?: string
          genres?: string
          id?: number
          primaryTitle?: string
          runtimeMinutes?: number
          startYear?: number
          tconst?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "watchlist_tconst_fkey"
            columns: ["tconst"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["tconst"]
          },
          {
            foreignKeyName: "watchlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
