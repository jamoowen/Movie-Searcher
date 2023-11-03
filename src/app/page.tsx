import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Index() {
 
  const supabase = createServerComponentClient({ cookies })

  const {data: {user}} = await supabase.auth.getUser();
  if (user) {

  } else {
    console.log('error getting session', user)
  }

  // const { data } = await supabase.from("watchlist").select();
  // const { data: movies } = await supabase.from("movies").select();
  // const { data: actors } = await supabase.from("actors").select();

  return (
    // <ul className="my-auto text-foreground">
    //   {movies?.map((movie) => (
    //     <li key={movie.id}>{movie.movieName}, {movie.movieRating}, {movie.releaseYear}
    //     {movie.director}, {movie.starringActors}
    //     </li>
    //   ))}
    // </ul>
    <div>hello</div>
  );
}

