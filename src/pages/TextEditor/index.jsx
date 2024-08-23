//redux
import { useDispatch, useSelector } from "react-redux";
import { updateFileContent } from "../../redux/foldersSlice";
//router
import { useParams } from "react-router-dom";
//styles
import "./styles.scss";

export const TextEditor = () => {
  const { fileID, folderID } = useParams();
  const dispatch = useDispatch();
  const objects = useSelector((state) => state).foldersReducer.objects;
  const file = objects?.find((obj) => obj.id === fileID);

  console.log(file);
  const handleContentChange = (e) => {
    console.log(objects);
    // Create a deep copy of the objects array to avoid mutating state directly
    const updatedObjectsInfo = objects.map((folder) => {
      console.log(folder);
      if (folder.some((file) => file.id === fileID)) {
        return {
          ...objects,
          file: {
            ...file,
            content: e.target.value,
          },
        };
      }
      return folder;
    });

    // Dispatch the updated object structure to the Redux store
    dispatch(updateFileContent(updatedObjectsInfo));
  };

  // Find the file based on fileID
  const folderContainingFile = objects.find((folder) =>
    folder.files?.some((file) => file.id === fileID)
  );

  const folderFile = folderContainingFile?.files.find(
    (file) => file.id === fileID
  );

  const handleFolderContentChange = (e) => {
    if (!folderContainingFile || !folderFile) {
      console.error("File not found!");
      return;
    }

    const updatedObjectsInfo = objects.map((folder) =>
      folder.id === folderContainingFile.id
        ? {
            ...folder,
            files: folder.files.map((f) =>
              f.id === fileID ? { ...f, content: e.target.value } : f
            ),
          }
        : folder
    );

    dispatch(updateFileContent(updatedObjectsInfo));
  };

  console.log(folderID);
  return (
    <div className="text_editor_wrapper">
      <textarea
        value={file?.content}
        onChange={() =>
          folderID !== undefined
            ? handleFolderContentChange
            : handleContentChange
        }
        className="text-editor"
        placeholder="Write your text here..."
      />
    </div>
  );
};
