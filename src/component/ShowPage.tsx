import { useQuery } from "react-query";
import { useSearchParams } from "react-router";
import { useState } from "react";
 
export default function ShowPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const [selectedSeason, setSelectedSeason] = useState(1);

  const fetchInfo = async () => {
    const url = `${import.meta.env.VITE_PUBLIC_MOVIE_SHOW_INFO_URL}${type}/${id}?api_key=${import.meta.env.VITE_PUBLIC_API_KEY}`;
    const response = await fetch(url);
    return response.json();
  };

  const fetchEpisodes = async () => {
    const url = `${import.meta.env.VITE_PUBLIC_MOVIE_SHOW_INFO_URL}tv/${id}/season/${selectedSeason}?api_key=${import.meta.env.VITE_PUBLIC_API_KEY}`;
    const response = await fetch(url);
    return response.json();
  };

  const {
    isLoading,
    isError,
    data: Info,
  }: any = useQuery(["Info", id, type], fetchInfo, {
     refetchOnWindowFocus: false,
  });

  const { data: seasonData } = useQuery(["Episodes", id, selectedSeason], fetchEpisodes, {
    enabled: type === "tv",
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  if (isLoading) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.dispatchEvent(new CustomEvent("loading-started"));
  } else {
    document.dispatchEvent(new CustomEvent("loading-stopped"));
  }

  const handleEpisodes = (
    show_id: any,
    season_number: any,
    episode_number: any
  ) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSearchParams(
      `type=tv&id=${show_id}&season_number=${season_number}&episode_number=${episode_number}`
    );
  };

  return (
    <>


      {isError ? (
        <p className="text-red-500 text-center mt-10">Failed to load Info.</p>
      ) : Info ? (
        <div className="flex flex-col lg:flex-row justify-between px-2 mb-4 gap-4 my-3">
           <div className="max-w-4xl font-sans text-gray-800 flex flex-col md:flex-row gap-4 lg:gap-3 items-center w-full lg:w-2/3">
            <div className="md:w-1/3 rounded-xl">
              {Info.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${Info.poster_path}`}
                  alt={Info.title}
                  className="rounded-xl shadow-md h-[360px] object-contain"
                />
              )}
            </div>

            <div className="md:w-2/3 text-xl">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-4xl font-bold text-white">
                  {Info.name || Info.title}
                </h1>
                {Info.vote_average && (
                  <span className="text-yellow-500 font-bold text-xl">
                    ⭐ {Info.vote_average.toFixed(1)}
                  </span>
                )}
              </div>
              <p className="text-gray-400 mb-4 text-lg">
                {Info.first_air_date || Info.release_date} •{" "}
                {Info.genres?.map((g: any) => g.name).join(", ")}
              </p>
              <p className="text-gray-300 mb-4">{Info.overview}</p>

              <div className="text-sm text-gray-400">
                <p className="text-white text-lg lead mb-0">
                  <span className="font-bold text-[#83836c] text-xl">Country:</span>{" "}
                  {Info.production_countries?.map((c: any) => c.name).join(", ")}
                </p>
                <p className="text-white text-lg lead mb-0">
                  <span className="font-bold text-[#83836c] text-xl">Genre:</span>{" "}
                  {Info.genres?.map((c: any) => c.name).join(", ")}
                </p>
                <p className="text-white text-lg lead mb-0">
                  <span className="font-bold text-[#83836c] text-xl">Release:</span>{" "}
                  {Info.release_date}
                </p>
                <p className="text-white text-lg lead mb-0">
                  <span className="font-bold text-[#83836c] text-xl">Production:</span>{" "}
                  {Info.production_companies?.map((p: any) => p.name).join(", ")}
                </p>
                <p className="text-white text-lg lead mb-0">
                  <span className="font-bold text-[#83836c] text-xl">Tagline:</span>{" "}
                  {Info.tagline}
                </p>
              </div>
            </div>
          </div>

           {type === "tv" && (
            <div className="w-full lg:w-1/3 bg-[#1a1a1a] h-max rounded-lg cursor-pointer text-gray-400">
              <div className="mb-4">
                <select
                  className="w-full px-3 py-2 rounded bg-[#2b2b2b] text-gray-400 cursor-pointer"
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(Number(e.target.value))}
                >
                  {Array.from({ length: Info.number_of_seasons }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Season {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="max-h-[380px] overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-[#86c9e0db]">
                {seasonData?.episodes?.map((ep: any) => (
                  <div
                    key={ep.id}
                    onClick={() =>
                      handleEpisodes(
                        ep.show_id,
                        ep.season_number,
                        ep.episode_number
                      )
                    }
                    className="px-3 py-1 cursor-pointer hover:bg-[#2c2c2c] border-b border-[#333]"
                  >
                    <p className="text-[16px] font-semibold mb-3">
                      Episode {ep.episode_number}: {ep.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}
