import { BrowserRouter, Routes, Route} from "react-router-dom";
import GlobalStyle from "./assets/globalStyles";
import Header from "../src/components/header";
import SelectMovie from "../src/components/selectMovie";
import SelectSession from "./components/selectSession";
import SelectSeats from "../src/components/selectSeats";
import About from "./components/about";
import ConfirmOrder from "../src/components/confirmOrder";
import WelcomeScreen from "./components/welcomeScreen";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
      <ScrollToTop />
            <Header />
            <Routes>
              <Route path="/" element={<WelcomeScreen />} />
              <Route path="/main" element={<SelectMovie />} />
              <Route path="/about/:movieId" element={<About />} />
              <Route path="/sessoes/:movieId" element={<SelectSession />} />
              <Route path="/assentos/:sessionId" element={<SelectSeats />} />
              <Route path="/confirm/:orderData" element={<ConfirmOrder />} />
            </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
