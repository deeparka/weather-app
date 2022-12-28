import StartPage from "./Components/StartPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WeatherPage from "./Components/WeatherPage";

function App() {
  return (
    <div className="bg-customBrownOne min-h-screen">
      <Router>
        <div className="text-customBrownThree font-poppins">
          <Routes>
            <Route exact path="/" element={<StartPage />} />
            <Route path="/weather" element={<WeatherPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
