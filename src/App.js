import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter
import Login from "./pages/login/login";
import Home from "./pages/home/home"

function App() {
  return (
    <div>
        <Router>
            <Routes>
                <Route path={"/login"} element={<Login />} />
                <Route path={"/home"} element={<Home />} />
            </Routes>
        </Router>

    </div>
  );
}

export default App;
