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
        objects: action.updatedObjectsInfo,
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

export const updateFileContent = (updatedObjectsInfo) => {
  return {
    type: "UPDATE_FILE_CONTENT",
    updatedObjectsInfo,
  };
};

export const addObjectToFolder = (updatedFolderFiles) => {
  return {
    type: "UPDATE_FOLDER_FILES",
    updatedFolderFiles,
  };
};
