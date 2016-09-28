import { combineReducers } from "redux";

import stopPoints from "./ArrivalReducer";
import bus from "./SearchReducer";

export default combineReducers({
    stopPoints,
    bus
});