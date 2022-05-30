import "./CSS/style.scss";

import StartPage from "./Components/StartPage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WeatherPage from "./Components/WeatherPage";

function App() {
    return (
        <Router>
            <div className="App">
                <div className="content">
                    <Routes>
                        <Route exact path="/" element={<StartPage />} />
                        <Route path="/weather" element={<WeatherPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
