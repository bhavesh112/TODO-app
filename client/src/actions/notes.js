import api from "../utils/api";
import { setAlert } from "./alert";
import { ADD_NOTE, REMOVE_NOTE, MODIFY_NOTE, GET_NOTES } from "./types";

export const getNotes = () => async (dispatch) => {
  try {
    const res = await api.get("/notes");
    dispatch({
      type: GET_NOTES,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const addNote = (title, text) => async (dispatch) => {
  const body = { title, text };
  try {
    const res = await api.post("/notes", body);
    dispatch({
      type: ADD_NOTE,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const removeNote = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/notes/${id}`);
    dispatch({
      type: REMOVE_NOTE,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const modifyNote = (title, text, id) => async (dispatch) => {
        const body ={title , text};
    try{
      const res=await api.patch(`/notes/${id}`,body);
      dispatch({
        type: MODIFY_NOTE,
        payload: res.data,
      });
    }catch(error){
        const errors = error.response.data.errors;
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }   
    }

};
