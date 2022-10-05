import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SelectMovie({ setMovieID }) {
  const URL = "https://mock-api.driven.com.br/api/v3/cineflex/movies";
  const promise = axios.get(URL);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    promise.then((response) => {
      setMovies(response.data);
    });
    promise.catch((error) => {
      alert(
        "something went wrong, please check your internet connection and try again"
      );
    });
  }, []);

  function handleClick(id) {
    setMovieID(id);
  }

  return (
    <MoviesContainer>
      <h2>Selecione o filme!</h2>
      {movies.map((movie) => {
        return (
          <MovieBanner>
            <Link to={`/sessoes/${movie.id}`}>
              <MovieImg src={movie.posterURL} onClick={handleClick(movie.id)} />
            </Link>
            <p>{movie.title}</p>
          </MovieBanner>
        );
      })}
    </MoviesContainer>
  );
}

const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 30px;

  h2 {
    width: 100%;
    text-align: center;
    margin: 30px 0;
    padding: 10px;
    font-size: 38px;
    font-weight: 700;
    font-family: "Caveat", cursive;
    text-shadow: 0px 0px 2px #808080;
    border-bottom: 1px solid black;
  }
`;
const MovieBanner = styled.div`
  width: 145px;
  background-color: #ffffff;
  padding: 10px 10px 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 5px 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 26px -7px #666666;

  p {
    margin: 8px;
    font-weight: 500;
    text-align: center;
    font-family: "Roboto", sans-serif;
  }
`;
const MovieImg = styled.img`
  width: 100%;
  height: auto;
`;
