import React from 'react'
import { connect } from 'react-redux'
import {
    addReqDone,
    editReqDone,
    formTitleChange,
    formGotSuggestions,
    formGotExtraFieldsDefinitions,
    formGotRequestDetails,
    formClear
} from '../Actions'
import SuggestionListContainer from './SuggestionListContainer'

import Ajax from "../Ajax"

let proposal_delay = 350;
let proposal_timeoutId;

let NewRequestForm = ({ dispatch, formState }) => {
    let input_title, extraFieldsHtml;
    // IF EDIT MODE
    if (formState.edit.enabled) {
        // Check if request full data is already retrieved
        if (!formState.loads.requestDetails) {
            // GET FULL REQUEST DATA
            Ajax.post(
                'api/request/get',
                {request_id: formState.edit.request_id},
                (data) => {
                    dispatch(formGotRequestDetails(data));
                },
                () => {
                    console.error("api/product/getExtraFields: API Call failed");
                }
            );
        }
        // Else everything is ready
    }



    // If request is realted to a product
    if (formState.request.product_id) {
        // Check if extra fields definitions are already retrieved
        if (!formState.loads.productExtraFields) {
            // GET Fields definitions
            Ajax.post(
                'api/product/getExtraFields',
                {product_id: formState.request.product_id},
                (data) => {
                    dispatch(formGotExtraFieldsDefinitions(data));
                },
                () => {
                    console.error("api/product/getExtraFields: API Call failed");
                }
            );
        } else {
            // Generate HTML for extra fields input
            extraFieldsHtml = formState.extraFields.map(field => {
                let input = (()=> {
                    switch (field.type) {
                        case 'Enum':
                            let currentValue = formState.request.extraFields[field.name];
                            let options = field.values.map(opt => {
                                let selected = (currentValue==opt) ? "selected" : "";
                                return (
                                    <option value={opt} selected={selected}>{opt}</option>
                                )
                            });
                            return (<select name={field.name}>{options}</select>);
                        case 'Date':
                            return (
                                <input type="date"
                                name={field.name}
                                value={formState.request.extraFields[field.name]}/>);
                        case 'String':
                        default:
                            return (
                                <input type="text"
                                    name={field.name}
                                    value={formState.request.extraFields[field.name]}/>
                            );
                    }
                })();
                return (
                    <div className="InputRow">
                        <label>
                            <div className="label">{field.label}</div>
                            {input}
                        </label>
                    </div>
                );
            });
        }
    }

    let clearForm = () => {
        dispatch(formClear());
    }

    let afterCreate = (data) => {
        dispatch(addReqDone(data));
    }
    let afterEdit = (data) => {
        dispatch(editReqDone({
            id: formState.edit.request_id,
            title: formState.request.title
        }));
    }

    let formValid = (data) => {
        if (data.title.trim().length == 0) return false;
        return true;
    }

    let onSubmit = (event) => {
        event.preventDefault();
        let url = formState.edit.enabled ? "/api/request/edit" : "/api/request/new",
            formData = Object.assign({}, formState.request, {
                title: input_title.value
            },{
                // Retrieve every extra fields values in one object
                extraFields: formState.extraFields.reduce(
                    (prev, field) => {
                        prev[field.name] = event.target.querySelector("*[name='"+field.name+"']").value;
                        return prev;
                    }
                ,{})
            }),
            handler = formState.edit.enabled ? afterEdit : afterCreate;

        if (!formValid(formData)) return
        Ajax.post(
            url,
            formData,
            handler,
            () => {
                console.error(url + ": API Call failed");
            }
        );
    }
    let onTextChange = (e) => {
        let text = e.target.value;
        clearTimeout(proposal_timeoutId);
        dispatch(
            formTitleChange(text)
        );
        text = text.trim();
        if (!text.length) return
        proposal_timeoutId = setTimeout(()=> {
            Ajax.post(
                '/api/product/autocomplete',
                {text},
                (data) => {
                    dispatch(
                        formGotSuggestions(data)
                    );
                },
                () => {
                    console.error("/api/product/autocomplete: API Call failed");
                }
            );
        }, proposal_delay);
    }

    let title = (formState.edit.enabled ? "Edit" : "Create") + " a request";
    let validationText = (formState.edit.enabled ? "Update request" : "Create a new request");
    return (
        <form className="NewRequestForm" onSubmit={onSubmit}>
            <h2>{title}</h2>
            <div className="InputRow">
                <label>
                    <span className="label">What do you need ?</span>
                    <div style={{position:"relative"}}>
                        <input className="titleInput" name="title" type="text"
                            ref={node => {
                                input_title = node
                            }}
                            onChange={onTextChange}
                            value={formState.request.title}/>
                        <SuggestionListContainer/>
                    </div>
                </label>
            </div>
            {extraFieldsHtml}
            <div className="InputRow Buttons">
                <a className="cancelButton" onClick={clearForm}>Cancel</a>
                <input type="submit" value={validationText}/>
            </div>
        </form>
    )
}


const mapStateToProps = (state) => {
    return {
        formState: state.form
    }
}

NewRequestForm = connect(mapStateToProps)(NewRequestForm)

export default NewRequestForm
