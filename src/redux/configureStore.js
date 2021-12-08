import {combineReducers, createStore} from "redux";
import selectedBoxDetails from "./ducks/selectedBoxDetails";
import sessionInfo from "./ducks/sessionInfo";

const reducer = combineReducers({
	selectedBoxDetails: selectedBoxDetails,
	//sessionInfo: sessionInfo, // ! will this work?
});

const store = createStore(reducer);
export default store;