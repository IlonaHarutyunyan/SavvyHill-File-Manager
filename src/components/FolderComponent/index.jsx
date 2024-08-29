import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { renameFile, updateFileStatus } from "../../redux/foldersSlice";
//styles
import "./styles.scss";
//components
import { ActionModal } from "../ActionModal";
import { FileActionModal } from "../FileActionModal";
//icons
import { FcFolder } from "react-icons/fc";
import { LuFileText } from "react-icons/lu";

const FolderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { folderID } = useParams();
  const folders = useSelector((state) => state.foldersReducer.objects);

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
    if (folder.type === "textFile") {
      navigate(`/text-editor/${folder.id}`);
    } else if (folder.type === "folder") {
      navigate(`/folder/${folder.id}`);
    }
  };

  const handleInputKeyDown = (e, folder) => {
    if (e.key === "Enter") {
      dispatch(renameFile(folder.id, renameInputValue));
      dispatch(updateFileStatus(folder.id, "default"));
    }
  };

  const findById = (items, id) => {
    for (const item of items) {
      if (item.id === id) {
        return item;
      }
      if (item.type === "folder" && item.files.length > 0) {
        const found = findById(item.files, id);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const folderComponents = findById(folders, folderID);

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
