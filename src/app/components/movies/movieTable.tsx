
'use client'


interface MovieData {
    movieName: string;
    releaseYear: number;
    director: string;
    movieRating: number;
    starringActors: string[];
    tconst: string;
  }
  
  interface MovieTableProps {
    moviedata: MovieData[];
  }
  

// const MovieTable: React.FC<MovieTableProps> = ({ moviename, releaseyear, director, score, starringactors, tconst }) => {
    const MovieTable: React.FC<MovieTableProps> = ({ moviedata }) => {
    function handleAdd(value: string) {
        console.log(`adding ${value} to watchlist`)
    }

    return (
       
        <table className="table-fixed rounded-sm text-xs lg:text-sm ">
        <thead className="border border-black text-white bg-gray-900">
            <tr>
                <th>Movie</th>
                <th>Release Year</th>
                <th>Director</th>
                <th>IMDB score</th>
                <th>Starring actors</th>
                <th className=''>Add to watchlist</th>
            </tr>
        </thead>
        {(moviedata.length >1) &&
        <tbody className="">
        { moviedata.map((movie, i) => (
            <tr key={i} className="cursor-auto group items-center justify-center text-black overflow-y-auto" >
                
            <td className="group-hover:bg-gray-100 text-teal-500 cursor-pointer underline border border-slate-500">{movie.movieName} </td>
            <td className="group-hover:bg-gray-100  border border-slate-500">{movie.releaseYear} </td>
            <td className="group-hover:bg-gray-100  border border-slate-500">{movie.director} </td>
            <td className="group-hover:bg-gray-100  border border-slate-500">{movie.movieRating}</td>
            <td className="group-hover:bg-gray-100  border border-slate-500">{movie.starringActors} </td>
            
            <td onClick={() =>{handleAdd(movie.tconst)}} className='mx-auto cursor-pointer flex my-auto justify-center mt-2 items-center w-8 h-8 hover:bg-green-500 hover:text-white'>Add</td>
        </tr>
                    
            ))}
            
        </tbody>
    }
    </table>
   
    )
}
export default  MovieTable