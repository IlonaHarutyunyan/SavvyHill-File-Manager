import { useEffect, useRef } from "react";
//redux
import { addObject, addObjectToFolder } from "../../redux/foldersSlice";
import { useDispatch, useSelector } from "react-redux";
//styles
import "./styles.scss";
//objects
import { folderObject, fileObject } from "../../objects/index";
import { useLocation, useParams } from "react-router-dom";

export const ActionModal = ({ xCoordinates, yCoordinates, setContextMenu }) => {
  const location = useLocation();
  const { folderID } = useParams();
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.foldersReducer.objects);
  const modalRef = useRef(null);

  const handleUpdateFolderFiles = (e) => {
    const folderObject = folders.find((folder) => folder.id === folderID);

    if (!folderObject) {
      console.error("Folder not found!");
      return;
    }

    const updatedObjectsInfo = folders.map((folder) =>
      folder.id === folderID
        ? {
            ...folder,
            files: [
              ...folder.files,
              {
                ...folderObject,
                name: `New Folder ${(folder.files.length || 0) + 1}`,
              },
            ],
          }
        : folder
    );

    dispatch(addObjectToFolder(updatedObjectsInfo));
  };

  const handleUpdateFolderTextFiles = (e) => {
    const folderObject = folders.find((folder) => folder.id === folderID);

    if (!folderObject) {
      console.error("Folder not found!");
      return;
    }

    const updatedObjectsInfo = folders.map((folder) =>
      folder.id === folderID
        ? {
            ...folder,
            files: [
              ...folder.files,
              {
                ...fileObject,
                name: `New Folder ${(folder.files.length || 0) + 1}.txt`,
              },
            ],
          }
        : folder
    );

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
