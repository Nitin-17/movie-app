import "../styles/Shimmer.css";
import "../styles/MovieCard.css";
const Shimmer = () => {
  return (
    <div className="movie-list">
      {Array(10)
        .fill("")
        .map((e, index) => (
          <div className="shimmer-card" key={index}></div>
        ))}
    </div>
  );
};

export default Shimmer;
