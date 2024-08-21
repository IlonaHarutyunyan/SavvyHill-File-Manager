const initialState = {
  objects: [],
};

export const FoldersSlice = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_OBJECT":
      console.log(action.objectInfo);
      return {
        ...state,
        objects: [...state.objects, action.objectInfo],
      };
    case "UPDATE_FILE_CONTENT":
      return {
        ...state,
        objects: action.updatedObjectsInfo,
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
