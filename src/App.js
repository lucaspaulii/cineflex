import {BrowserRouter, Routes, Route, } from "react-router-dom";
import GlobalStyle from "./assets/globalStyles";
import Header from '../src/components/header';
import SelectMovie from '../src/components/selectMovie';
import SelectTime from '../src/components/selectTime';
import SelectSeats from '../src/components/selectSeats';
import ConfirmOrder from '../src/components/confirmOrder';
import { useState } from "react";

function App() {
  const [movieID, setMovieID] = useState()
  return (
    <>
    <GlobalStyle />
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SelectMovie setMovieID = {setMovieID} />}/>
        <Route path="/sessoes/:idFilme" element={<SelectTime />}/>
        <Route path="/assentos/:idSessao" element={<SelectSeats />}/>
        <Route path="/confirm/:idOrder" element={<ConfirmOrder />}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
