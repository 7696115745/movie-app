import { useQuery } from "react-query";
import { FaPlay } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router";
export default function Carousel() {
  const navigate = useNavigate()

  const fetchMovies = async () => {
    try {
      const url =
        import.meta.env.VITE_PUBLIC_UPCOMING_URL +
        import.meta.env.VITE_PUBLIC_API_KEY;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  const {
    isLoading,
    isError,
    data: movie,
  }: any = useQuery({
    queryKey: ["latest-movies"],
    queryFn: fetchMovies,
    refetchOnWindowFocus: false
  });

  if (isLoading) {
    document.dispatchEvent(new CustomEvent("loading-started"));
  } else {
    document.dispatchEvent(new CustomEvent("loading-stopped"));
  }
  if (isError || !movie?.results) return <p className="text-red-500">Failed to load content.</p>;
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className=" d-none carousel-indicators">
        {movie.results.slice(0, 8).map((_: any, index: number) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner rounded-sm">
        {movie.results.slice(0, 8).map((item: any, index: number) => (
          <div
            className={`carousel-item relative ${index === 0 ? "active" : ""}`}
            key={item.id}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
              className="d-block w-100 object-cover h-[90vh]"
              alt={item.title}
            />
            <div className="carousel-caption bottom-0 left-0 px-6 md:px-10 lg:px-16 pb-20 bg-gradient-to-t from-black via-transparent to-transparent absolute w-full h-full flex flex-col justify-end
             ">
              <h5 className="fs-[10px] sm:fs-2">{item.title}</h5>
              <div className="flex items-center gap-4 my-3 text-lg">
                <span>{new Date(item.release_date).getFullYear()}</span>
                <span className="text-yellow-400 font-bold">⭐ {item.vote_average.toFixed(1)}
                </span>
                <span className="bg-yellow-400 text-black px-2 py-0.5 rounded text-xs font-bold">IMDB</span>
                <span className="text-gray-300 hidden md:inline">Action • Drama • Sci-Fi</span>
              </div>
              <p className="text-gray-200 max-w-2xl text-[20px] sm:inline-block hidden">{item.overview}</p>
              <div className="carousel-btn mt-4 flex gap-4">
                <button className=" flex items-center gap-2 bg-yellow-300 text-black px-5 py-2  font-semibold hover:bg-[#fdc700] transition" onClick={() => navigate(`/watch-now?type=movie&id=${item.id}`)
                }><FaPlay />

                  Play</button>
                <button className="flex items-center gap-2 justify-center bg-gray-700 bg-opacity-60 text-white px-5 py-2 font-semibold hover:bg-opacity-80 transition"><FiPlus />
                  My list</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
