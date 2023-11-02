
'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
// import { cookies } from 'next/headers'
import MovieTable from "@/app/components/movies/movieTable";
import { TablePagination, TablePaginationProps } from '@mui/base/TablePagination';
import { useState, useEffect } from "react";

interface MovieData {
    movieName: string;
    releaseYear: number;
    director: string;
    movieRating: number;
    starringActors: string[];
    tconst: string;
  }
interface MovieTableProps {
    moviedata: MovieData[]; // Replace YourMovieDataInterface with your data structure.
  }
  


export default function Movies() {
    // const cookieStore = cookies()
    const supabase = createClientComponentClient();
    // const user = await supabase.auth.getSession();

    // const { data } = await supabase.from("watchlist").select();

    const itemsPerPage = 10; // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);

    


    // const { data: movies } = await supabase.from("movies").select().limit(5);
   
    

    return (
        <div>he</div>
    )
}
