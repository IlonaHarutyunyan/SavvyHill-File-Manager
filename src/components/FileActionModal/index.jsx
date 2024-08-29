import React from "react";
import { useDispatch } from "react-redux";
//styles
import "./styles.scss";
//redux
import { deleteFile, updateFileStatus } from "../../redux/foldersSlice";

export const FileActionModal = ({
  xCoordinates,
  yCoordinates,
  setFileContextMenu,
  fileContextMenu,
  setRenameInputValue,
}) => {
  const dispatch = useDispatch();
  
  const style = {
    top: yCoordinates,
    left: xCoordinates,
    position: "absolute",
  };

  const handleAction = (action, file) => {
    switch (action) {
      case "rename": {
        setRenameInputValue(file.name);
        dispatch(updateFileStatus(file.id, "rename"));
        break;
      }
      case "delete": {
        dispatch(deleteFile(file.id));
        break;
      }
      default:
        break;
    }
    setFileContextMenu(null);
  };

  return (
    <div className="file-action-modal" style={style}>
      <ul>
        <li onClick={() => handleAction("rename", fileContextMenu.file)}>
          Rename
        </li>
        <li onClick={() => handleAction("delete", fileContextMenu.file)}>
          Delete
        </li>
      </ul>
    </div>
  );
};
