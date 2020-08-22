import {TOGGLE_EDIT} from './types';

export const toggleEdit=(editable)=>async dispatch =>{
    const edit = (editable)?false:true;
    dispatch({
      type: TOGGLE_EDIT,
      payload : edit  
    });
}