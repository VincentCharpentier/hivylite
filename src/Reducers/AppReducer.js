import { combineReducers } from 'redux'
import {
    GET_ALL_REQ,
    EDIT_REQ,
    FORM_ADD_DONE,
    FORM_EDIT_DONE,
    FORM_TITLE_CHANGE,
    FORM_GOT_SUGGESTIONS,
    FORM_SUGGESTION_CHOSEN,
    FORM_GOT_EXTRAFIELDS,
    FORM_CLEAR
} from '../Actions'

import RequestFormReducer from './RequestFormReducer'

function sortRequests(rA, rB) {
    return rA.title.toLowerCase()
        .localeCompare(rB.title.toLowerCase());
}

function requests(state = [], action) {
    console.log("REDUCER");
    var nextState;
    switch (action.type) {
        case GET_ALL_REQ:
            nextState = action.requests;
            break;
        case FORM_ADD_DONE:
            nextState = [
                ...state,
                {
                    id: action.request.id,
                    title: action.request.title
                }
            ]
            break;
        case FORM_EDIT_DONE:
            nextState = state.map(request => {
                if (request.id === action.request.id) {
                    return {
                        id: action.request.id,
                        title: action.request.title
                    };
                }
                return request;
            });
            break;
        default:
            return state
    }
    return nextState.sort(sortRequests);
}



// // Default request to fill the form with
// const defaultRequest = {
//     title: "",
//     product_id: null
// };
//
// function editRequest(state = defaultRequest, action) {
//     switch (action.type) {
//         case FORM_ADD_DONE:
//         case FORM_EDIT_DONE:
//         case FORM_CLEAR:
//             return defaultRequest;
//         case EDIT_REQ:
//             return action.request;
//         case FORM_TITLE_CHANGE:
//             return Object.assign({}, state, {
//                 title: action.value
//             });
//         case FORM_SUGGESTION_CHOSEN:
//             return Object.assign({}, state, {
//                 title: action.suggestion.name,
//                 product_id: action.suggestion.id
//             });
//         default:
//             return state;
//     }
// }
//
// function editMode(state = false, action) {
//     switch (action.type) {
//         case FORM_ADD_DONE:
//         case FORM_EDIT_DONE:
//         case FORM_CLEAR:
//             return false;
//         case EDIT_REQ:
//             return true;
//         default:
//             return state;
//     }
// }
//
//
//
//
//
// let form = combineReducers({ editRequest, suggestions, editMode, extraFields });

let AppReducer = combineReducers({ requests, form: RequestFormReducer });

export default AppReducer;
