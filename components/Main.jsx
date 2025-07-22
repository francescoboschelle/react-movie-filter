import { useEffect, useState } from "react";
import movies from "../data/data";

export default function Main() {
  const [filter, setFilter] = useState("All");
  const [fullData, setFullData] = useState(movies); // Data completo
  const [data, setData] = useState(movies); // Data visibile in pagine
  const [query, setQuery] = useState("");
  const [newName, setNewName] = useState("");
  const [newGenre, setNewGenre] = useState("");

  useEffect(() => {
    let newData;
    if (filter === "All") {
      newData = fullData;
    } else {
      newData = fullData.filter((movie) => movie.genre === filter);
    }

    if (query !== "") {
      newData = fullData.filter((movie) => movie.title.startsWith(query));
    }

    setData(newData);
  }, [filter, query, fullData]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!newName || !newGenre) {
      alert("Devi inserire tutti i dati!");
      return;
    }

    const newMovie = { title: newName, genre: newGenre };

    setData([...data, newMovie]);
    setFullData([...fullData, newMovie]);
  }

  return (
    <main>
      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title text-center">Lista film</h1>
            <hr />

            <div className="container">
              <form onSubmit={handleSubmit}>
                <h3 className="text-center mb-3">Inserisci film</h3>
                <div className="mb-3 row">
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control"
                      name="inputName"
                      id="inputName"
                      placeholder="Nome"
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control"
                      name="inputGenre"
                      id="inputGenre"
                      placeholder="Genere"
                      onChange={(e) => setNewGenre(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-3 row justify-content-center">
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Inserisci
                    </button>
                  </div>
                </div>
              </form>
            </div>
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
                  {fullData.map((movie, index) => {
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

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
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
