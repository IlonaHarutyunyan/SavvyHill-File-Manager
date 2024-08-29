import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//redux
import { addObject, addObjectToFolder } from "../../redux/foldersSlice";
//styles
import "./styles.scss";
//objects
import { folderObject, fileObject } from "../../objects/index";

export const ActionModal = ({ xCoordinates, yCoordinates, setContextMenu }) => {
  const { folderID } = useParams();
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.foldersReducer.objects);
  const modalRef = useRef(null);

  const handleUpdateFolderFiles = (e) => {
    const addFileToFolder = (folders, folderID) => {
      return folders.map((folder) => {
        if (folder.id === folderID) {
          return {
            ...folder,
            files: [
              ...folder.files,
              {
                ...folderObject,
                name: `New File ${(folder.files.length || 0) + 1}`,
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              },
            ],
          };
        } else if (folder.type === "folder" && folder.files) {
          return {
            ...folder,
            files: addFileToFolder(folder.files, folderID),
          };
        }
        return folder;
      });
    };

    const updatedObjectsInfo = addFileToFolder(folders, folderID);

    dispatch(addObjectToFolder(updatedObjectsInfo));
  };

  const handleUpdateFolderTextFiles = (e) => {
    const addTextFileToFolder = (folders, folderID) => {
      return folders.map((folder) => {
        if (folder.id === folderID) {
          return {
            ...folder,
            files: [
              ...folder.files,
              {
                ...fileObject,
                name: `New File ${(folder.files.length || 0) + 1}.txt`,
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              },
            ],
          };
        } else if (folder.type === "folder" && folder.files) {
          return {
            ...folder,
            files: addTextFileToFolder(folder.files, folderID),
          };
        }
        return folder;
      });
    };

    const updatedObjectsInfo = addTextFileToFolder(folders, folderID);

    dispatch(addObjectToFolder(updatedObjectsInfo));
  };

  const handleCreateFolder = () => {
    folderID !== undefined
      ? handleUpdateFolderFiles()
      : dispatch(
          addObject({
            ...folderObject,
            name: `New Folder ${(folders?.length ? folders.length : 0) + 1}`,
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          })
        );
    setContextMenu(null);
  };

  const handleCreateTextFile = () => {
    folderID !== undefined
      ? handleUpdateFolderTextFiles()
      : dispatch(
          addObject({
            ...fileObject,
            name: `New Text File ${
              (folders?.length ? folders.length : 0) + 1
            }.txt`,
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          })
        );
    setContextMenu(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setContextMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setContextMenu]);

  return (
    <div
      className="create_modal_wrapper"
      style={{
        top: yCoordinates,
        left: xCoordinates,
      }}
      ref={modalRef}
    >
      <div onClick={handleCreateFolder}>Create New Folder</div>
      <div onClick={handleCreateTextFile}>Create Text File</div>
    </div>
  );
};
