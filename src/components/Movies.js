import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "../styles/General.css";
import "../styles/MovieCard.css";
import "../styles/Style.css";
import Shimmer from "./Shimmer";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const filterData = (searchInput, movies) => {
  const filterList = movies.filter((movie) =>
    movie?.title?.toLowerCase()?.includes(searchInput.toLowerCase())
  );
  return filterList;
};

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const notify = (error) => toast(error);

  const loadMoreMovies = () => {
    if (hasMoreMovies) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const loadPreviousMovies = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 500 &&
      !loading
    ) {
      loadMoreMovies();
    }
  };

  const fetchMovies = async (pageNumber) => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `https://demo.credy.in/api/v1/maya/movies/?page=${pageNumber}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Movies fetched successfully

        // Append new movies to the existing list
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setFilteredMovies(data.results);

        // Check if there are more movies to fetch
        setHasMoreMovies(data.next !== null);
      } else {
        setError("Failed to fetch movies. Please try again later.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  return (
    <div>
      <Header />
      {loading ? (
        <Shimmer />
      ) : error ? (
        <div>
          <section class="section-cta" id="cta">
            <div class="container">
              <div class="cta">
                <div class="cta-text-box">
                  <p class="cta-text">{error}</p>

                  <button
                    class="btn btn--form"
                    type="submit"
                    disabled={loading}
                    onClick={() => window.location.reload()}
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>
            {error && <p>{notify(error)}</p>}
          </section>
        </div>
      ) : (
        <>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search Movie Here"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              className="search-btn "
              onClick={() => {
                const data = filterData(searchInput, movies);
                setFilteredMovies(data);
                setSearchInput("");
              }}
            >
              Search
            </button>
            <button
              className="search-btn"
              onClick={() => {
                setFilteredMovies(movies);
                setSearchInput("");
              }}
            >
              Reset
            </button>
          </div>
          <div className="movie-list">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.uuid} movie={movie} />
            ))}
          </div>
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={loadPreviousMovies}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className="pagination-btn"
              onClick={loadMoreMovies}
              disabled={!hasMoreMovies}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MoviesPage;
