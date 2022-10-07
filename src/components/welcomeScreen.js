import styled from "styled-components";
import { Link } from "react-router-dom";

export default function WelcomeScreen() {
  return (
    <WelcomeScreenContainer>
      <h1>CINEFLEX</h1>
      <Link to={`/main`} style={{ textDecoration: "none" }}>
        <button>Clique aqui para entrar!</button>
      </Link>
    </WelcomeScreenContainer>
  );
}

const WelcomeScreenContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background-color: #800000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 70px;
    font-family: "Caveat Brush", cursive;
    text-shadow: 0px 0px 8px #666666;
    color: #fffee0;
    margin-bottom: 20px;
  }
  button {
    font-family: "Roboto", sans-serif;
    background-color: #a35a5a;
    padding: 13px 18px;
    border-radius: 10px;
    margin: 10px 10px 10px 0;
    color: #fffee0;
    font-weight: 600;
    font-size: 18px;
    border: none;
  }
`;
