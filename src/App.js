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
  const { folderID } = useParams();
  const state = useSelector((state) => state);
  const folderComponents = state.foldersReducer.objects.find(
    (obj) => obj.id === +folderID
  );

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text-editor/:fileID" element={<TextEditor />} />
          <Route path="/folder/:folderID" element={<FolderComponent folders={folderComponents?.files}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
