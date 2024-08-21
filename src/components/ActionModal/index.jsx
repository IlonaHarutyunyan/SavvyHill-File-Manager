import { useEffect, useRef } from "react";
//redux
import { addObject } from "../../redux/foldersSlice";
import { useDispatch, useSelector } from "react-redux";
//styles
import "./styles.scss";
//objects
import { folderObject, fileObject } from "../../objects/index";

export const ActionModal = ({ xCoordinates, yCoordinates, setContextMenu }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const folders = state.foldersReducer.objects;
  const modalRef = useRef(null);

  const handleCreateFolder = () => {
    dispatch(
      addObject({
        ...folderObject,
        id: folders?.length ? folders.length : 0,
        name: `New Folder ${(folders?.length ? folders.length : 0) + 1}`,
      })
    );
    setContextMenu(null);
  };

  const handleCreateTextFile = () => {
    dispatch(
      addObject({
        ...fileObject,
        id: folders?.length ? folders.length : 0,
        name: `New Text File ${(folders?.length ? folders.length : 0) + 1}.txt`,
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
