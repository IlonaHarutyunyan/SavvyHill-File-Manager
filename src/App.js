//styles
import { useSelector } from "react-redux";
import "./App.css";
import FolderComponent from "./components/FolderComponent";
//components
import { Home } from "./pages/Home";
import { TextEditor } from "./pages/TextEditor";
//router
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useParams,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text-editor/:fileID" element={<TextEditor />} />
          <Route path="/folder/:folderID" element={<FolderComponent/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
