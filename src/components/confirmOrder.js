import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

export default function ConfirmOrder() {
  const { orderData } = useParams();
  const orderDataArrays = orderData.split("&");
  const seatsArray = orderDataArrays[0].split("$");
  seatsArray.length = seatsArray.length - 1;
  const name = orderDataArrays[1].replaceAll("$", " ");
  const cpf = orderDataArrays[2];
  const movie = orderDataArrays[3].replaceAll("$", " ");
  const date = orderDataArrays[4].replaceAll("$", "/");
  const sessionHour = orderDataArrays[5];

  return (
    <ConfirmContainer>
      <h2>Pedido feito com sucesso!</h2>
      <InformationContainer>
        <h3>Filme e sessão</h3>
        <p>{movie}</p>
        <p>
          {date} {sessionHour}
        </p>
      </InformationContainer>
      <InformationContainer>
        <h3>Ingressos</h3>
        {seatsArray.map((seat) => {
          return <p>Assento {seat}</p>;
        })}
      </InformationContainer>
      <InformationContainer>
        <h3>Comprador</h3>
        <p>Nome: {name}</p>
        <p>CPF: {cpf}</p>
      </InformationContainer>
      <Link to="/">
        <HomeButton>Voltar para Home!</HomeButton>
      </Link>
    </ConfirmContainer>
  );
}

const ConfirmContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
    color: green;
    text-shadow: 0px 0px 8px #666666;
  }
`;
const InformationContainer = styled.div`
  margin: 0 0 50px 50px;
  font-family: "Roboto", sans-serif;
  width: 100%;

  h3 {
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  p {
    font-size: 20px;
    margin-bottom: 8px;
  }
`;

const HomeButton = styled.button`
  width: 200px;
  height: 60px;
  background-color: #800000;
  border: none;
  border-radius: 15px;
  color: #ffffff;
  font-family: "Caveat Brush", cursive;
  font-size: 24px;
  box-shadow: 0px 0px 26px -7px #666666;
`;
