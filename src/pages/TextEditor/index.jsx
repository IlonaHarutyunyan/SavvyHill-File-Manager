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
  const state = useSelector((state) => state);
  const objects = state.foldersReducer.objects;
  const file = objects?.find((obj) => obj.id === +fileID);
  const handleContentChange = (e) => {
    const updatedObjectsInfo = [...objects];

    updatedObjectsInfo[+fileID] = {
      ...updatedObjectsInfo[+fileID],
      content: e.target.value,
    };

    dispatch(updateFileContent(updatedObjectsInfo));
  };

  return (
    <div className="text_editor_wrapper">
      <textarea
        value={file?.content}
        onChange={handleContentChange}
        className="text-editor"
        placeholder="Write your text here..."
      />
      {/* <button onClick={handleCloseTextFile}>Close</button> */}
    </div>
  );
};
