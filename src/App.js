//router
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
//styles
import "./App.css";
//components
import FolderComponent from "./components/FolderComponent";
//pages
import { Home } from "./pages/Home";
import { TextEditor } from "./pages/TextEditor";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text-editor/:fileID" element={<TextEditor />} />
          <Route path="/folder/:folderID" element={<FolderComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
