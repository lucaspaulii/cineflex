import {BrowserRouter, Routes, Route, } from "react-router-dom";
import GlobalStyle from "./assets/globalStyles";
import Header from '../src/components/header';
import SelectMovie from '../src/components/selectMovie';
import SelectSession from './components/selectSession';
import SelectSeats from '../src/components/selectSeats';
import ConfirmOrder from '../src/components/confirmOrder';
import { useState } from "react";

function App() {
  const [movieID, setMovieID] = useState();
  const [sessionID, setSessionID] = useState();
  
  return (
    <>
    <GlobalStyle />
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SelectMovie setMovieID = {setMovieID} />}/>
        <Route path="/sessoes/:movieId" element={<SelectSession movieID = {movieID} setSessionID={setSessionID}/>}/>
        <Route path="/assentos/:sessionId" element={<SelectSeats sessionID={sessionID}/>}/>
        <Route path="/confirm/:orderId" element={<ConfirmOrder />}/> {/*Posso usar o orderId como um join da array de selecionados unidos por um caractere especial que depois posso separar*/}
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
