import {combineReducers, createStore} from "redux";
import selectedBoxDetails from "./ducks/selectedBoxDetails";

const reducer = combineReducers({
	selectedBoxDetails: selectedBoxDetails,
});

const store = createStore(reducer);
export default store;