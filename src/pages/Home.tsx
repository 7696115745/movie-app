import Carousel from "../component/Carousel";
import MovieCards from "../component/MovieCard";
import TvShowCards from "../component/TvShowCard";
   export default function Home() {

  return (
 <>
 
    <div className="bg-black text-white px-4 py-6 sm:px-6 md:px-12 lg:px-[32px] flex flex-col gap-4">
        <Carousel/>
 <MovieCards/>
 <TvShowCards/>
 </div>
 </>  
 )
}
