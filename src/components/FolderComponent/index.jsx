import React, { useState } from "react";
import { useSelector } from "react-redux";
//styles
import "./styles.scss";
//components
import { ActionModal } from "../ActionModal";
//icons
import { FcFolder } from "react-icons/fc";
import { LuFileText } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";

const FolderComponent = () => {
  const navigate = useNavigate();
  const { folderID } = useParams();
  const folders = useSelector((state) => state.foldersReducer.objects);

  const folderComponents = folders.find((obj) => obj.id === folderID);
  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleDoubleClick = (folder) => {
    if (folder.type === "textFile") {
      navigate(`/text-editor/${folder.id}`);
    } else if (folder.type === "folder") {
      navigate(`/folder/${folder.id}`);
    }
  };

  const foldersObject =
    folderID !== undefined ? folderComponents?.files : folders;

  return (
    <div onContextMenu={handleContextMenu} className="files_wrapper">
      {foldersObject?.map((folder, index) => {
        return (
          <div
            key={index}
            className="folder"
            onDoubleClick={() => handleDoubleClick(folder)}
          >
            <div className="icon-wrapper">
              {folder.type === "folder" ? <FcFolder /> : <LuFileText />}
            </div>
            {folder.name}
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
    </div>
  );
};

export default FolderComponent;
