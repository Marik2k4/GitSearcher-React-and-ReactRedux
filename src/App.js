import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Main from "./components/main/Main";
import Card from "./components/card/Card";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/card/:username/:reponame" element={<Card />} />
      </Routes>
    </Router>
  );
}

export default App;
