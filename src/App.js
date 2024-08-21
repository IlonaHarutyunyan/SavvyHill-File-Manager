//styles
import "./App.css";
//components
import { Home } from "./pages/Home";
import { TextEditor } from "./pages/TextEditor";
//router
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text-editor/:fileID" element={<TextEditor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
