export const GET_ALL_REQ = 'GET_ALL_REQ';
export const EDIT_REQ = 'EDIT_REQ';

export const FORM_ADD_DONE = 'FORM/ADD';
export const FORM_EDIT_DONE = 'FORM/EDIT';
export const FORM_TITLE_CHANGE = 'FORM/TITLE_CHANGE';
export const FORM_GOT_SUGGESTIONS = 'FORM/GOT_SUGGESTIONS';
export const FORM_SUGGESTION_CHOSEN = 'FORM/SUGGESTION_CHOSEN';
export const FORM_GOT_REQUEST_DETAILS = 'FORM/GOT_REQUEST_DETAILS';
export const FORM_GOT_EXTRAFIELDS_DEF = 'FORM/GOT_EXTRAFIELDS_DEF';
export const FORM_CLEAR = 'FORM/FORM_CLEAR';




export function getAllReq(requests) {
    return {
        type: GET_ALL_REQ,
        requests
    }
}


export function addReqDone(request) {
    return {
        type: FORM_ADD_DONE,
        request
    }
}
export function editReqDone(request) {
    return {
        type: FORM_EDIT_DONE,
        request
    }
}

export function editReq(request) {
    return {
        type: EDIT_REQ,
        request
    }
}

export function formTitleChange(value) {
    return {
        type: FORM_TITLE_CHANGE,
        value
    }
}

export function formGotSuggestions(values) {
    return {
        type: FORM_GOT_SUGGESTIONS,
        values
    }
}

export function formSuggestionChosen(suggestion) {
    return {
        type: FORM_SUGGESTION_CHOSEN,
        suggestion
    }
}

export function formGotRequestDetails(request) {
    return {
        type: FORM_GOT_REQUEST_DETAILS,
        request
    }
}
export function formGotExtraFieldsDefinitions(fields) {
    return {
        type: FORM_GOT_EXTRAFIELDS_DEF,
        fields
    }
}

export function formClear() {
    return {
        type: FORM_CLEAR
    }
}
