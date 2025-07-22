import { useEffect, useState } from "react";
import movies from "../data/data";

export default function Main() {
  const [filter, setFilter] = useState("All");
  const [data, setData] = useState([movies]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let newData;
    if (filter === "All") {
      newData = movies;
    } else {
      newData = movies.filter((movie) => movie.genre === filter);
    }

    if (query !== "") {
      newData = newData.filter((movie) => movie.title.startsWith(query));
    }

    setData(newData);
  }, [filter, query]);

  return (
    <main>
      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title text-center">Lista film</h1>
            <hr />

            <div className="d-flex gap-3">
              <div className="dropdown mb-3">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="triggerId"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {filter === "All" ? "Filter by Genres" : filter}
                </button>
                <div className="dropdown-menu" aria-labelledby="triggerId">
                  <p
                    className="dropdown-item"
                    key={`dropdown:0`}
                    onClick={() => setFilter("All")}
                  >
                    Filter by Genres
                  </p>
                  {movies.map((movie, index) => {
                    return (
                      <p
                        className="dropdown-item"
                        key={`dropdown:${index}`}
                        onClick={() => setFilter(movie.genre)}
                      >
                        {movie.genre}
                      </p>
                    );
                  })}
                </div>
              </div>

              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  name=""
                  id=""
                  aria-describedby="helpId"
                  placeholder="Search movie"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            <ul className="list-group">
              {data.map((movie, index) => {
                return (
                  <li className="list-group-item" key={`movie:${index}`}>
                    {movie.title} | {movie.genre}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
