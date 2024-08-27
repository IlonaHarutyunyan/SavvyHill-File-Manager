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
      return {
        ...state,
        objects: state.objects.map((item) => {
          if (item.id === action.payload.fileID) {
            return { ...item, content: action.payload.content };
          } else if (item.type === "folder") {
            return {
              ...item,
              files: item.files.map((file) =>
                file.id === action.payload.fileID
                  ? { ...file, content: action.payload.content }
                  : file
              ),
            };
          }
          return item;
        }),
      };

    case "RENAME_FILE":
      return {
        ...state,
        objects: state.objects.map((item) => {
          if (item.id === action.payload.fileID) {
            return { ...item, name: action.payload.newName };
          } else if (item.type === "folder") {
            return {
              ...item,
              files: item.files.map((file) =>
                file.id === action.payload.fileID
                  ? { ...file, name: action.payload.newName }
                  : file
              ),
            };
          }
          return item;
        }),
      };

    case "DELETE_FILE":
      return {
        ...state,
        objects: state.objects
          .map((item) => {
            if (item.id === action.payload.fileID) {
              return null;
            } else if (item.type === "folder") {
              return {
                ...item,
                files: item.files.filter(
                  (file) => file.id !== action.payload.fileID
                ),
              };
            }
            return item;
          })
          .filter(Boolean),
      };

    case "UPDATE_FILE_STATUS":
      return {
        ...state,
        objects: state.objects.map((item) => {
          if (item.id === action.payload.fileID) {
            return { ...item, status: action.payload.newStatus };
          } else if (item.type === "folder") {
            return {
              ...item,
              files: item.files.map((file) =>
                file.id === action.payload.fileID
                  ? { ...file, status: action.payload.newStatus }
                  : file
              ),
            };
          }
          return item;
        }),
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
    payload: { fileID, content },
  };
};

export const renameFile = (fileID, newName) => {
  return {
    type: "RENAME_FILE",
    payload: { fileID, newName },
  };
};

export const deleteFile = (fileID) => {
  return {
    type: "DELETE_FILE",
    payload: { fileID },
  };
};

export const updateFileStatus = (fileID, newStatus) => {
  return {
    type: "UPDATE_FILE_STATUS",
    payload: { fileID, newStatus },
  };
};
export const addObjectToFolder = (updatedFolderFiles) => {
  return {
    type: "UPDATE_FOLDER_FILES",
    updatedFolderFiles,
  };
};
