export default function reducer(state={
    bus: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {

    switch (action.type) {
        case "FETCH_BUS": {
            return {...state, fetching: true}
        }
        case "FETCH_BUS_REJECTED": {
            return {...state, fetched: true, fetching: false, error: action.payload}
        }
        case "FETCH_BUS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                bus: action.payload,
            }
        }
    }

    return state
}