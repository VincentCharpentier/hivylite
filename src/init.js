import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { render } from 'react-dom'

import Ajax from "./Ajax"
import { getAllReq } from './Actions'
import App from "./App"
import AppReducer from "./Reducers/AppReducer"


// INIT
let store = createStore(AppReducer);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('main')
);

(function(){
    Ajax.get(
        "api/request/getAll", null,
        (data) => {
            var action = getAllReq(data);
            store.dispatch(action);
        },
        () => {
            console.error("/api/getRequests: API Call failed");
        }
    );
})();
