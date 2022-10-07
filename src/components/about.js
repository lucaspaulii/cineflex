import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./loading";

export default function About() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieId}/showtimes`;
    const promise = axios.get(URL);
    promise.then((response) => {
      setMovieData(response.data);
    });
    promise.catch((error) => {
      alert(
        "something went wrong, please check your internet connection and try again"
      );
    });
  }, [movieId]);

  if (movieData.length === 0) {
    return <Loading />;
  }
  return (
    <AboutHeader>
      <h2>{movieData.title}</h2>
      <img src={movieData.posterURL} alt={movieData.title}></img>
      <p>{movieData.overview}</p>
      <ButtonsContainer>
        <Link to="/">
          <button>Voltar</button>
        </Link>
        <Link to={`/sessoes/${movieId}`}>
          <button>Continuar</button>
        </Link>
      </ButtonsContainer>
    </AboutHeader>
  );
}

const AboutHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
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
  img {
    width: 60%;
    border-radius: 15px;
    margin-bottom: 20px;
  }
  p {
    text-align: justify;
    font-family: "Roboto", sans-serif;
    width: 90%;
    font-size: 13px;
    margin-bottom: 20px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 60%;
  margin-bottom: 40px;

  button {
    background-color: #800000;
    border: none;
    width: 80px;
    border-radius: 15px;
    color: #ffffff;
    font-family: "Caveat Brush", cursive;
    padding: 5px 10px;
    font-size: 17px;
  }
`;
