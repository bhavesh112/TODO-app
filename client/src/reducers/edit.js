import {TOGGLE_EDIT} from '../actions/types';


const initialState ={
    edit : false
};


export default function (state=initialState , action){
  const {type , payload} = action;

switch (type) {
    case TOGGLE_EDIT:
        return{
            ...state,
            edit :payload
        }

    default:
        return state;
}


}
