import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//styles
import "./styles.scss";
//components
import { ActionModal } from "../ActionModal";
//icons
import { FcFolder } from "react-icons/fc";
import { LuFileText } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { FileActionModal } from "../FileActionModal";
import { renameFile, updateFileStatus } from "../../redux/foldersSlice";

const FolderComponent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { folderID } = useParams();
  const folders = useSelector((state) => state.foldersReducer.objects);

  const folderComponents = folders.find((obj) => obj.id === folderID);
  const [contextMenu, setContextMenu] = useState(null);
  const [fileContextMenu, setFileContextMenu] = useState(null);
  const [renameInputValue, setRenameInputValue] = useState("");

  const handleContextMenu = (event, folder) => {
    event.preventDefault();
    if (folder !== undefined) {
      setFileContextMenu({
        x: event.clientX,
        y: event.clientY,
        file: folder,
      });
    } else {
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
      });
    }
  };

  const handleDoubleClick = (folder) => {
    console.log(folder)
    if (folder.type === "textFile") {
      navigate(`/text-editor/${folder.id}`);
    } else if (folder.type === "folder") {
      navigate(`/folder/${folder.id}`);
    }
  };

  const handleInputKeyDown = (e, folder) => {
    if (e.key === "Enter") {
      dispatch(renameFile(folder.id, renameInputValue));
      dispatch(updateFileStatus(folder.id, "default"))
    }
  };

  const foldersObject =
    folderID !== undefined ? folderComponents?.files : folders;

  return (
    <div className="files_wrapper" onContextMenu={handleContextMenu}>
      {foldersObject?.map((folder, index) => {
        return (
          <div
            key={index}
            className="folder"
            onDoubleClick={() => handleDoubleClick(folder)}
            onContextMenu={(event) => handleContextMenu(event, folder)}
          >
            <div className="icon-wrapper">
              {folder.type === "folder" ? <FcFolder /> : <LuFileText />}
            </div>
            {folder.status === "rename" ? (
              <div>
                <input
                  value={renameInputValue}
                  onChange={(e) => setRenameInputValue(e.target.value)}
                  onKeyDown={(e) => handleInputKeyDown(e, folder)}
                />
              </div>
            ) : (
              folder.name
            )}
          </div>
        );
      })}
      {contextMenu && (
        <ActionModal
          xCoordinates={contextMenu.x}
          yCoordinates={contextMenu.y}
          setContextMenu={() => setContextMenu()}
        />
      )}
      {fileContextMenu && (
        <FileActionModal
          xCoordinates={fileContextMenu.x}
          yCoordinates={fileContextMenu.y}
          setFileContextMenu={() => setFileContextMenu(null)}
          fileContextMenu={fileContextMenu}
          setRenameInputValue={setRenameInputValue}
        />
      )}
    </div>
  );
};

export default FolderComponent;
