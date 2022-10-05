import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./loading";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function SelectSeats() {
  const [sessionData, setSessionData] = useState([]);
  const { sessionId } = useParams();
  const [isClicked, setIsClicked] = useState([]);

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`;
    const promise = axios.get(URL);
    promise.then((response) => {
      setSessionData(response.data);
    });
    promise.catch((error) => {
      alert(
        "something went wrong, please check your internet connection and try again"
      );
    });
  }, []);

  function handleSeatClick(id) {
    const newIsClicked = [...isClicked, id];
    setIsClicked(newIsClicked);
  }

  if (sessionData.length === 0) {
    return <Loading />;
  }
  return (
    <>
      <SeatsContainer>
        <h2>Selecione o(s) assento(s)</h2>
        <SeatButtonContainer>
          {sessionData.seats.map((seat) => {
            return (
              <SeatButton
                onClick={() => handleSeatClick(seat.id)}
                color={
                  isClicked.includes(seat.id)
                    ? "#abf7b1"
                    : "light-gray"
                }
                borderColor={
                  isClicked.includes(seat.id)
                    ? "green"
                    : "gray"
                }
                disabled={((!seat.isAvailable) && (true))}
              >
                {seat.name}
              </SeatButton>
            );
          })}
        </SeatButtonContainer>
        <SeatDisplayOptions>
          <div>
            <SeatDisplayOptionsButton
              color="#abf7b1"
              borderColor="green"
            ></SeatDisplayOptionsButton>
            <p>Selecionado</p>
          </div>
          <div>
            <SeatDisplayOptionsButton
              color="light-gray"
              borderColor="gray"
            ></SeatDisplayOptionsButton>
            <p>Disponível</p>
          </div>
          <div>
            <SeatDisplayOptionsButton
              color="pink"
              borderColor="#800000"
            ></SeatDisplayOptionsButton>
            <p>Indisponível</p>
          </div>
        </SeatDisplayOptions>
      </SeatsContainer>
      <Footer>
        <img src={sessionData.movie.posterURL} alt={sessionData.movie.title} />
        <div>
          <p>{sessionData.movie.title}</p>
          <p>
            {sessionData.day.weekday} - {sessionData.name}
          </p>
        </div>
      </Footer>
    </>
  );
}

const SeatsContainer = styled.div`
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

const SeatButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SeatButton = styled.button`
  font-family: "Roboto", sans-serif;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  margin: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  border: 1px solid ${(props) => props.borderColor};
  :disabled {
    color: #000000;
    background-color: pink;
    border: 1px solid #800000;
  }
`;

const SeatDisplayOptions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  p {
    margin-top: 5px;
    font-weight: 300;
    font-size: 13px;
    font-family: "Roboto", sans-serif;
  }
`;

const SeatDisplayOptionsButton = styled.button`
  font-family: "Roboto", sans-serif;
  background-color: ${(props) => props.color};
  border: 1px solid ${(props) => props.borderColor};
  width: 30px;
  height: 30px;
  border-radius: 50%;
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
    font-size: 20px;
    font-weight: 400;
    color: #ffffff;
  }
  div {
    display: flex;
    flex-direction: column;
  }
`;
