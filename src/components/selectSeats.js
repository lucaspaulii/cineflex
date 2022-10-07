import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./loading";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function SelectSeats() {
  const [sessionData, setSessionData] = useState([]);
  const { sessionId } = useParams();
  const [isClicked, setIsClicked] = useState([]);
  const [seatNames, setSeatNames] = useState([]);
  const [name, setName] = useState();
  const [cpf, setCpf] = useState();
  const navigate = useNavigate();

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
  }, [sessionId]);

  function handleSeatClick(id, name) {
    let newIsClicked;
    let newSeatNames;
    if (isClicked.includes(id)) {
      if (window.confirm(`Você realmente quer remover a cadeira ${name}?`)) {
        newIsClicked = isClicked.filter((n) => n !== id);
        newSeatNames = seatNames.filter((n) => n !== name);
        setIsClicked(newIsClicked);
        setSeatNames(newSeatNames);
        return;
      } else {
        return;
      }
    }
    newIsClicked = [...isClicked, id];
    newSeatNames = [...seatNames, name];
    setSeatNames(newSeatNames);
    setIsClicked(newIsClicked);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const body = { ids: [...isClicked], name, cpf };
    const URL =
      "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many";
    const promise = axios.post(URL, body);
    let newNavigate = "/confirm/";
    seatNames.forEach((element) => {
      newNavigate += `${element}$`;
    });
    const encryptedName = name.replaceAll(" ", "$");
    const encryptedMovieName = sessionData.movie.title.replaceAll(" ", "$");
    const encryptedDate = sessionData.day.date.replaceAll("/", "$");
    newNavigate =
      newNavigate +
      "&" +
      encryptedName +
      "&" +
      cpf +
      "&" +
      encryptedMovieName +
      "&" +
      encryptedDate +
      "&" +
      sessionData.name;
    promise.then((response) => {
      navigate(`${newNavigate}`);
    });
    promise.catch((error) => {
      console.log(error);
    });
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
                onClick={() => handleSeatClick(seat.id, seat.name)}
                color={isClicked.includes(seat.id) ? "#abf7b1" : "light-gray"}
                borderColor={isClicked.includes(seat.id) ? "green" : "gray"}
                disabled={!seat.isAvailable && true}
                key={seat.id}
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
        <form onSubmit={handleSubmit}>
          <InputsContainer>
            {/*<h3>Assento {seat.name}</h3>*/}
            <label forhtml="name">Nome do comprador:</label>
            <input
              id="name"
              type="text"
              value={name}
              placeholder="Insira o nome aqui"
              onChange={(e) => setName(e.target.value)}
              required
            ></input>
            <label forhtml="cpf">CPF do comprador</label>
            <input
              id="cpf"
              type="number"
              value={cpf}
              placeholder="Insira o CPF aqui"
              onChange={(e) => setCpf(e.target.value)}
              required
            ></input>
          </InputsContainer>
          <SubmitButton type="submit" disabled={(isClicked.length === 0 ? true : false)}>Reservar assento(s)</SubmitButton>
        </form>
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
  align-items: center;
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
  align-items: center;
  justify-content: space-between;
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

const InputsContainer = styled.div`
  font-family: "Roboto", sans-serif;
  margin: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    font-weight: 600;
    margin-bottom: 5px;
  }
  label {
    margin-bottom: 5px;
  }
  input {
    width: 90%;
    height: 3vh;
    border: 1px solid orange;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 4px;
    box-shadow: 0px 0px 15px -10px #666666;
  }
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  height: 80px;
  width: 100%;
  background-color: #800000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto", sans-serif;

  img {
    height: 80%;
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
const SubmitButton = styled.button`
  margin: 0 auto;
  width: 100%;
  background-color: #a35a5a;
  border: none;
  border-radius: 15px;
  color: #ffffff;
  font-family: "Caveat Brush", cursive;
  padding: 5px 10px;
  font-size: 17px;
`;
