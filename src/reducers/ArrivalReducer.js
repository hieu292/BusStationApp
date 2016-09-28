export default function reducer(state={
    stopPoints: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {

    switch (action.type) {
        case "FETCH_ARRIVAL_BUS": {
            return {...state, fetching: true}
        }
        case "FETCH_ARRIVAL_BUS_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_ARRIVAL_BUS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                stopPoints: action.payload,
            }
        }
    }

    return state
}