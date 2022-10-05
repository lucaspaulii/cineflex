import styled from "styled-components";

export default function Header() {
  return (
    <HeaderContainer>
      <h1>CINEFLEX</h1>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 67px;
  background-color: #800000;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 26px -7px #666666;
  h1 {
    font-size: 50px;
    font-family: 'Caveat Brush', cursive;
    text-shadow: 0px 0px 8px #666666;
    color: #ffffff;
  }
`;
