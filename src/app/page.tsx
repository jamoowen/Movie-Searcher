import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function Index() {

  const supabase = createServerComponentClient({ cookies })

  const { data: { user } } = await supabase.auth.getUser();
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
    <div className="mx-auto my-auto min-h-screen mt-7 overflow-hidden animate-slide md:w-4/6 w-11/12 rounded-sm px-2 py-2 bg-white">
      <div className="">
        <Image
          alt="Movie search logo"
          src="/images/film-wheel.png"
          width="50"
          height="50"
          className="animate-spinFinite"
        />

        <div className="text-lg flex flex-col border-teal-500 border-4 bg-slate-200 px-2 py-10 gap-3 bg-opacity-50 rounded-md mt-2 mb-2">
          <span className="text-3xl">Welcome!</span> <br />

          <div className="italic">Have you ever sat down, the anticipation killing you, finally ready to relax and watch some
            netflix, <span className="text-xl font-bold">BUT</span>, You dont know what to watch??🤯
          </div>

          <div>
            Well, if that is you - your'e in luck! <br />
          Search by -> director, actor, genre, IMDB rating ✅
          </div>

          <div>
            <Link href="/signin" className="text-purple-700 cursor-pointer underline">
              Sign up
            </Link>
            - That way you can add your favorite movies to your watchlist!
          </div>
        </div>
      </div>
    </div>

  );
}

