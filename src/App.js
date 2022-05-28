import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/organism/navbar";
import About from "./pages/about";
import Home from "./pages/home";
import customTheme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Navbar>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
