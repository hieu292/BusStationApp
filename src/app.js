import { Provider } from 'react-redux';
import React, { Component } from 'react';
import RouterWithRedux from './routes';



import createStore from './store/createStore';



class BusStationApp extends React.Component {
    render () {
        return (
            <Provider store={createStore}>
                <RouterWithRedux />
            </Provider>
        );
    }
}

export default BusStationApp;