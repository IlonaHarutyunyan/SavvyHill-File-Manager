//styles
import "./styles.scss";
//components
import FolderComponent from "../../components/FolderComponent";
import { useSelector } from "react-redux";

export const Home = () => {
  return (
    <div className="home_page_wrapper">
      <FolderComponent/>
    </div>
  );
};
