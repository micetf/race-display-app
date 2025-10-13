import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ControlPage from "./pages/ControlPage";
import DisplayPage from "./pages/DisplayPage";

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Routes>
                    <Route path="/" element={<ControlPage />} />
                    <Route path="/display" element={<DisplayPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
