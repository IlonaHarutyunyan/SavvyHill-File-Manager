//redux
import { useDispatch, useSelector } from "react-redux";
import { updateFileContent } from "../../redux/foldersSlice";
//router
import { useParams } from "react-router-dom";
//styles
import "./styles.scss";

export const TextEditor = () => {
  const { fileID } = useParams();
  const dispatch = useDispatch();
  const objects = useSelector((state) => state.foldersReducer.objects);

  const findFileById = (items, id) => {
    for (let item of items) {
      if (item.id === id && item.type === "textFile") {
        return item;
      }
      if (item.type === "folder" && item.files) {
        const found = findFileById(item.files, id);
        if (found) return found;
      }
    }
    return null;
  };

  const file = findFileById(objects, fileID);

  const handleContentChange = (e) => {
    dispatch(updateFileContent(fileID, e.target.value));
  };

  return (
    <div className="text_editor_wrapper">
      <textarea
        value={file?.content || ""}
        onChange={handleContentChange}
        className="text-editor"
        placeholder="Write your text here..."
      />
    </div>
  );
};
