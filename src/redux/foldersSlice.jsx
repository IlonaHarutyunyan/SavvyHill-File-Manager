const initialState = {
  objects: [],
};

export const FoldersSlice = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_OBJECT":
      return {
        ...state,
        objects: [...state.objects, action.objectInfo],
      };

    case "UPDATE_FILE_CONTENT":
      const updateFileContentInObject = (obj, fileID, content) => {
        if (obj.id === fileID) {
          return { ...obj, content: content };
        }

        if (obj.type === "folder" && obj.files && obj.files.length > 0) {
          return {
            ...obj,
            files: obj.files.map((file) =>
              updateFileContentInObject(file, fileID, content)
            ),
          };
        }

        return obj;
      };

      return {
        ...state,
        objects: state.objects.map((obj) =>
          updateFileContentInObject(obj, action.fileID, action.content)
        ),
      };

    case "RENAME_FILE":
      const renameFileInObject = (obj, fileID, newName) => {
        if (obj.id === fileID) {
          return { ...obj, name: newName };
        }
        if (obj.type === "folder" && obj.files && obj.files.length > 0) {
          return {
            ...obj,
            files: obj.files.map((file) =>
              renameFileInObject(file, fileID, newName)
            ),
          };
        }

        return obj;
      };

      return {
        ...state,
        objects: state.objects.map((obj) =>
          renameFileInObject(obj, action.fileID, action.newName)
        ),
      };

    case "DELETE_FILE":
      const deleteFileInObject = (obj, fileID) => {
        if (obj.id === fileID) {
          return null;
        }

        if (obj.type === "folder" && obj.files && obj.files.length > 0) {
          const updatedFiles = obj.files
            .map((file) => deleteFileInObject(file, fileID))
            .filter(Boolean);

          return {
            ...obj,
            files: updatedFiles,
          };
        }

        return obj;
      };

      return {
        ...state,
        objects: state.objects
          .map((obj) => deleteFileInObject(obj, action.fileID))
          .filter(Boolean),
      };

    case "UPDATE_FILE_STATUS":
      const updateFileStatusInObject = (obj, fileID, newStatus) => {
        if (obj.id === fileID) {
          return { ...obj, status: newStatus };
        }

        if (obj.type === "folder" && obj.files && obj.files.length > 0) {
          return {
            ...obj,
            files: obj.files.map((file) =>
              updateFileStatusInObject(file, fileID, newStatus)
            ),
          };
        }

        return obj;
      };

      return {
        ...state,
        objects: state.objects.map((obj) =>
          updateFileStatusInObject(obj, action.fileID, action.newStatus)
        ),
      };

    case "UPDATE_FOLDER_FILES":
      return {
        ...state,
        objects: action.updatedFolderFiles,
      };

    default:
      return state;
  }
};

export const addObject = (objectInfo) => {
  return {
    type: "ADD_OBJECT",
    objectInfo,
  };
};

export const updateFileContent = (fileID, content) => {
  return {
    type: "UPDATE_FILE_CONTENT",
    fileID,
    content,
  };
};

export const renameFile = (fileID, newName) => {
  return {
    type: "RENAME_FILE",
    fileID,
    newName,
  };
};

export const deleteFile = (fileID) => {
  return {
    type: "DELETE_FILE",
    fileID,
  };
};

export const updateFileStatus = (fileID, newStatus) => {
  return {
    type: "UPDATE_FILE_STATUS",
    fileID,
    newStatus,
  };
};
export const addObjectToFolder = (updatedFolderFiles) => {
  return {
    type: "UPDATE_FOLDER_FILES",
    updatedFolderFiles,
  };
};
