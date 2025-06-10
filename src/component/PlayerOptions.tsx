import { useState } from "react";

interface PlayerOptionsProps {
  setPlayer: (player: string) => void;
}

export default function PlayerOptions({ setPlayer }: PlayerOptionsProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState("Player 1");

  const handleSelect = (player: string) => {
    setSelectedPlayer(player);
    setPlayer(player);  
     setShowDropdown(false);
  };

  return (
    <div className="bg-[#121212] px-4 py-3 flex items-center justify-between rounded-lg text-white text-sm">
      <span className="tracking-wide font-light">Media not loading? Try another player</span>

      <div className="relative" tabIndex={0} onBlur={() => setShowDropdown(false)}>
        <button
          className="bg-[#2c2c2c] hover:bg-[#3c3c3c] text-white px-3 py-1 rounded-lg text-sm flex items-center"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {selectedPlayer}
          <svg className="ml-1 w-4 h-4" viewBox="0 0 20 20">
            <path d="M5.25 7.75L10 12.5l4.75-4.75z" />
          </svg>
        </button>

        {showDropdown && (
          <div className="absolute top-full mt-1 left-0 bg-[#2c2c2c] w-full rounded shadow-lg z-10">
            <div className="px-4 py-2 hover:bg-[#3c3c3c] cursor-pointer" onClick={() => handleSelect("Player 1")}>
              Player 1
            </div>
            <div className="px-4 py-2 hover:bg-[#3c3c3c] cursor-pointer" onClick={() => handleSelect("Player 2")}>
              Player 2
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
