import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import notes from './notes'
export default combineReducers({
  alert,
  auth,
  notes
});
