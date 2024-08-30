import { combineReducers } from "redux";
import { FoldersSlice } from "./foldersSlice";

export const rootReducer = combineReducers({
 foldersReducer: FoldersSlice,
});