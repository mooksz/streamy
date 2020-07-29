//React
import React from "react";
import ReactDOM from "react-dom";

//Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

//Reducers
import reducers from "./reducers";

//Components
import App from "./components/App";

//Use Redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const STORE = createStore(reducers, composeEnhancers(applyMiddleware()));

ReactDOM.render(
	<Provider store={STORE}>
		<App />
	</Provider>,
	document.querySelector("#root")
);
