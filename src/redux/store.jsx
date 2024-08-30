import { createStore } from "redux";
import { rootReducer } from "./rootReducer.jsx";

export const store = createStore(rootReducer);
