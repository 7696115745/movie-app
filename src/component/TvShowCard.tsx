import { useQuery } from "react-query";
import { useNavigate,useMatch,useSearchParams } from "react-router";

export default function TvShowCards() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
  const type = searchParams.get("type");
    const match = useMatch('/watch-now')

    const fetchTvShows = async () => {
    try {
      if(match){
  const url =
        import.meta.env.VITE_PUBLIC_TV_RECOMENDED_URL +type+`/`+id+`/`+`recommendations?api_key=`+
        import.meta.env.VITE_PUBLIC_API_KEY;
      const response = await fetch(url);
      const data = await response.json();
       return data;
      }
      else{
  const url =
        import.meta.env.VITE_PUBLIC_TV_URL +
        import.meta.env.VITE_PUBLIC_API_KEY;
      const response = await fetch(url);
      const data = await response.json();
      return data;
      }
    
    } catch (error: any) {
      throw error;
    }
  };

  const {
    isLoading,
    isError,
    data: movie,
  }: any = useQuery({
    queryKey: ["TvShows",id,type],
    queryFn: fetchTvShows,
    refetchOnWindowFocus: false
  });

  if (isLoading) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.dispatchEvent(new CustomEvent("loading-started"));
  } else {
    document.dispatchEvent(new CustomEvent("loading-stopped"));
  }
  const handlePlayer = (id: any) => {
    navigate(`/watch-now?type=tv&id=${id}`)
  }

  return (<>
    <div className="flex justify-between items-center mb-6 px-3">
      <h2 className="text-2xl font-bold text-white">TRENDING SHOWS</h2>
      <button className="bg-yellow-500 text-black px-4 py-1 rounded hover:bg-yellow-400 transition-all text-sm font-semibold">
        View More
      </button>
    </div>

    {isError ? (
      <p className="text-red-500">Failed to load movies.</p>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
        {movie?.results?.slice(0, 16).map((content: any, index: number) => (
          <div key={index} className="bg-[#111] rounded-lg overflow-hidden shadow-md cursor-pointer" onClick={() => handlePlayer(content.id)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
              alt={content.title}
              className="w-full object-cover"
            />
            <div className="px-2 py-3">
              <p className="text-sm font-semibold truncate text-white">{content.name}</p>
              <p className="text-xs text-gray-400 uppercase">
                {content.media_type}  {new Date(content.first_air_date).getFullYear()}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </>
  );
}
