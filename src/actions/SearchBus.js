import axios from "axios";

export function fetchBus(lineNumber) {
    return function(dispatch) {
        axios.get("https://api.tfl.gov.uk/line/"+ lineNumber + "/route/sequence/outbound")
            .then((response) => {
                var payload = response.data.stopPointSequences[0].stopPoint;
                dispatch({type: "FETCH_BUS_FULFILLED", payload: payload})
            })
            .catch((err) => {
                dispatch({type: "FETCH_BUS_REJECTED", payload: err})
            })
    }
}