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
          birthYear: number | null
          fullName: string | null
          id: number
          knownMovies: string[] | null
        }
        Insert: {
          birthYear?: number | null
          fullName?: string | null
          id?: number
          knownMovies?: string[] | null
        }
        Update: {
          birthYear?: number | null
          fullName?: string | null
          id?: number
          knownMovies?: string[] | null
        }
        Relationships: []
      }
      movies: {
        Row: {
          director: string | null
          movieName: string | null
          movieRating: number | null
          releaseYear: number | null
          starringActors: string | null
          tconst: string
        }
        Insert: {
          director?: string | null
          movieName?: string | null
          movieRating?: number | null
          releaseYear?: number | null
          starringActors?: string | null
          tconst: string
        }
        Update: {
          director?: string | null
          movieName?: string | null
          movieRating?: number | null
          releaseYear?: number | null
          starringActors?: string | null
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
          directorNumber: string | null
          id: number
          tconst: string
          user_id: string
        }
        Insert: {
          directorNumber?: string | null
          id?: number
          tconst: string
          user_id: string
        }
        Update: {
          directorNumber?: string | null
          id?: number
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
