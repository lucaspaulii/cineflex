import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./loading";

export default function SelectSession() {
  const [sessions, setSessions] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const { movieId } = useParams()

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieId}/showtimes`;
    const promise = axios.get(URL);
    promise.then((response) => {
      setSessions(response.data.days);
      setMovieData(response.data);
    });
    promise.catch((error) => {
      alert(
        "something went wrong, please check your internet connection and try again"
      );
    });
  }, []);

  if (sessions.length === 0) {
    return <Loading />;
  }
  return (
    <>
      <SessionsContainer>
        <h2>Selecione o horário!</h2>
        {sessions.map((session) => {
          return (
            <SessionContainer key={session.id}>
              <p>{session.weekday + " - " + session.date}</p>
              <ShowtimesContainer>
                {session.showtimes.map((showtime) => {
                  return (
                    <Link to={`/assentos/${showtime.id}`} style={{textDecoration:"none"}} key={showtime.id}>
                      <ShowtimeButton>
                        {showtime.name}
                      </ShowtimeButton>
                    </Link>
                  );
                })}
              </ShowtimesContainer>
            </SessionContainer>
          );
        })}
      </SessionsContainer>
      <Footer>
        <img src={movieData.posterURL} alt={movieData.title} />
        <p>{movieData.title}</p>
      </Footer>
    </>
  );
}

const SessionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 30px 150px;

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

const SessionContainer = styled.div`
  margin: 13px;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  border-bottom: 1px solid #6666664d;

  p {
    font-size: 23px;
    font-weight: 300;
  }
`;

const ShowtimesContainer = styled.div`
  display: flex;
`;

const ShowtimeButton = styled.div`
  background-color: pink;
  padding: 10px 15px;
  border-radius: 5px;
  margin: 10px 10px 10px 0;
  color: #ffffff;
`;
const Footer = styled.div`
  position: fixed;
  bottom: 0;
  height: 120px;
  width: 100%;
  background-color: #800000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto", sans-serif;

  img {
    height: 90%;
    width: auto;
    border: 3px solid #ffffff;
    margin-right: 30px;
  }
  p {
    font-size: 27px;
    font-weight: 400;
    color: #ffffff;
  }
`;
