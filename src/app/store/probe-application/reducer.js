import { combineReducers } from "redux";
import { installationsSlice } from "./installations/installationsSlice";

export default combineReducers({
  installations: installationsSlice.reducer,
});
