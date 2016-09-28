import axios from "axios";

export function fetchArrivalBus(stopPointId) {
    return function(dispatch) {
        axios.get("https://api.tfl.gov.uk/StopPoint/" + stopPointId + "/arrivals")
            .then((response) => {
                dispatch({type: "FETCH_ARRIVAL_BUS_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_ARRIVAL_REJECTED", payload: err})
            })
    }
}