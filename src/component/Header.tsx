import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-[#0f1c2d] text-white mt-[10px]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
           <div className="flex-shrink-0 text-2xl font-bold cursor-pointer select-none">
            <Link to="/" className="flex items-center">
              <span className="text-white">Moviix</span>
               <span className="text-xs self-end mb-1 ml-1">™</span>
            </Link>
          </div>
          
              <div className="hidden md:flex flex-1 mx-8">
            <input
              type="search"
              placeholder="Search movies..."
              className="
                w-full max-w-xl
                px-4 py-2
                bg-[#1a2a3a]
                border border-[#2a3b4d]
                rounded
                focus:outline-none focus:ring-2 focus:ring-[#00a8e1] focus:border-[#00a8e1]
                text-white
                placeholder-[#6b7d8d]
                transition
              "
              aria-label="Search movies"
            />
          </div>
 
           <div className="flex items-center space-x-6">
             <nav className="hidden md:flex space-x-6 items-center">
              <Link
                to="/"
                className="text-white hover:text-[#00a8e1] font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/redeem"
                className="text-white hover:text-[#00a8e1] font-medium transition-colors duration-200"
              >
                Trending
              </Link>
              <Link
                to="/my-movies"
                className="text-white hover:text-[#00a8e1] font-medium transition-colors duration-200"
              >
                My Movies
              </Link>
            </nav>

             <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white hover:text-[#00a8e1] transition"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-[#00a8e1] rounded hover:bg-[#008fc7] transition"
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}