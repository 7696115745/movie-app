import { useSearchParams } from "react-router-dom";
import MovieCards from "../component/MovieCard";
import TvShowCards from "../component/TvShowCard";
import ShowPage from "../component/ShowPage";
import PlayerOptions from "../component/PlayerOptions";
import { useState } from "react";

export default function WatchNow() {
  const [searchParams] = useSearchParams();
  const [player, setPlayer] = useState("Player 1");

  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const season = searchParams.get("season_number");
  const episode = searchParams.get("episode_number");

   const getIframeSrc = () => {
    if (player === "Player 2") {
      return `https://player.vidsrc.co/embed/${type}/${id}/${season || ""}/${episode || ""}`;
    } else {
      return `https://player.videasy.net/${type}/${id}/${season || ""}/${episode || ""}`;
    }
  };

  return (
    <>
      <div className="relative pb-[56.25%] h-0 overflow-hidden mt-3 mb-7">
        <iframe
          key={player} 
          src={getIframeSrc()}
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-presentation"
          title="Video Player"
        ></iframe>
      </div>

       <PlayerOptions setPlayer={setPlayer} />

      <div>
        <ShowPage />
      </div>

      {type === "movie" ? <MovieCards /> : type === "tv" ? <TvShowCards /> : ""}
    </>
  );
}
