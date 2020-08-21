import { ADD_NOTE, REMOVE_NOTE, MODIFY_NOTE, GET_NOTES } from "../actions/types";

const initialState = {
  notes: [],
};

export default function(state = initialState , action){
    const {type , payload} = action;
    
    switch (type) {
        case ADD_NOTE:
        case REMOVE_NOTE:
        case MODIFY_NOTE:
        case GET_NOTES:
            return{
                ...state,
                notes:payload
            }    
            
    
        default:
            return state;
    }
}
