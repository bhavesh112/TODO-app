import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import notes from './notes';
import edit from './edit';
export default combineReducers({
  alert,
  auth,
  notes,
  edit
});
