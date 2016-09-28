import {
    Scene,
    Router,
    Modal
} from 'react-native-router-flux';
import React, { Component } from 'react';

import HomeScreen from './components/HomeScreen';
import SelectScreen from './components/SelectScreen';
import ResultScreen from './components/ResultScreen';
import Error from './components/Error';


const getSceneStyle = (props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 64;
        style.marginBottom = computedProps.hideTabBar ? 0 : 50;
    }
    return style;
};



export default class RouterWithRedux extends Component{
    render() {
        return (
            <Router getSceneStyle={getSceneStyle}>
                <Scene key="modal" component={Modal} >
                    <Scene key="root" hideNavBar hideTabBar>
                        <Scene key="homeScreen" component={HomeScreen} title="Home Screen" initial />
                        <Scene key="selectScreen" component={SelectScreen} title="Select Screen" />
                        <Scene key="resultScreen" component={ResultScreen} title="Result Screen" />
                    </Scene>
                    <Scene key="error" component={Error} />
                </Scene>
            </Router>
        );
    }
}