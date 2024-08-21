//styles
import "./styles.scss";
//components
import FolderComponent from "../../components/FolderComponent";
import { useSelector } from "react-redux";

export const Home = () => {
  const state = useSelector((state) => state);
  const folders = state.foldersReducer.objects;
  return (
    <div className="home_page_wrapper">
      <FolderComponent folders={folders} />
    </div>
  );
};
