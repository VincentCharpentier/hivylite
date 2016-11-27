import { combineReducers } from 'redux'
import {
    EDIT_REQ,
    FORM_TITLE_CHANGE,
    FORM_ADD_DONE,
    FORM_EDIT_DONE,
    FORM_GOT_SUGGESTIONS,
    FORM_SUGGESTION_CHOSEN,
    FORM_GOT_EXTRAFIELDS_DEF,
    FORM_GOT_REQUEST_DETAILS,
    FORM_CLEAR
} from '../Actions'

const defaultFormState = {
    edit: {
        enabled: false, // BOOL
        request_id: null // INTEGER
    },
    request: {
        // Request OBJ
        title: "",
        extraFields: []
    },
    loads: {
        requestDetails: false, // BOOL
        productExtraFields: false // BOOL
    },
    suggestions: [],
    extraFields: []
}


function edit(state = defaultFormState.edit, action) {
    switch (action.type) {
        case FORM_ADD_DONE:
        case FORM_EDIT_DONE:
        case FORM_CLEAR:
            return defaultFormState.edit;
        case EDIT_REQ:
            return {
                enabled: true,
                request_id: action.request.id
            }
        default:
            return state;
    }
}

function request(state = defaultFormState.request, action) {
    switch (action.type) {
        case FORM_ADD_DONE:
        case FORM_EDIT_DONE:
        case FORM_CLEAR:
            return defaultFormState.request;
        case FORM_GOT_REQUEST_DETAILS:
            return action.request;
        case FORM_TITLE_CHANGE:
            return Object.assign({}, state, {
                title: action.value
            })
        case EDIT_REQ:
            // Partial req
            return Object.assign(
                {},
                defaultFormState.request,
                {
                    title: action.request.title,
                }
            );
        case FORM_SUGGESTION_CHOSEN:
            return Object.assign({}, state, {
                title: action.suggestion.name,
                product_id: action.suggestion.id
            });
        default:
            return state;
    }
}

function loads(state = defaultFormState.loads, action) {
    switch (action.type) {
        case FORM_ADD_DONE:
        case FORM_EDIT_DONE:
        case FORM_CLEAR:
        case EDIT_REQ:
            return defaultFormState.loads;
        case FORM_GOT_REQUEST_DETAILS:
            return Object.assign({}, state,{
                requestDetails: true
            });
        case FORM_GOT_EXTRAFIELDS_DEF:
            return Object.assign({}, state,{
                productExtraFields: true
            });
        default:
            return state;
    }
}

function suggestions(state = defaultFormState.suggestions, action) {
    switch(action.type) {
        case FORM_GOT_SUGGESTIONS:
            return action.values;
        case FORM_ADD_DONE:
        case FORM_EDIT_DONE:
        case FORM_SUGGESTION_CHOSEN:
        case EDIT_REQ:
        case FORM_CLEAR:
            return [];
        default:
            return state;
    }
}

function extraFields(state = defaultFormState.extraFields, action) {
    switch(action.type) {
        case FORM_CLEAR:
        case FORM_SUGGESTION_CHOSEN:
            return defaultFormState.extraFields;
        case FORM_GOT_EXTRAFIELDS_DEF:
            return action.fields;
        default:
            return state;
    }
}

let RequestFormReducer = combineReducers({ edit, request, loads, suggestions, extraFields });

export default RequestFormReducer;
