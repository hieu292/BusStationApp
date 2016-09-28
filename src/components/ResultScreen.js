import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';
import {Actions} from "react-native-router-flux";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/ArrivalBus';

class Result extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const {state, actions, data } = this.props;
        if(state.stopPoints.stopPoints.length == 0){
            actions.fetchArrivalBus(data.id);
        }

    }

    render() {
        const stopPoints = this.props.state.stopPoints.stopPoints;
        let mapStopPoints;
        if(bus.length > 0){
            mapStopPoints = stopPoints.map(b => <Text>{b.name}</Text>);
        } else {
            mapStopPoints = <Text>Don't have StopPoint. Error Massage: {this.props.stopPoints.error.message}</Text>
        }
        return (
            <View style={styles.container}>
                <Text style={styles.text_bus}>
                    {this.props.data.name}
                </Text>
                
                {mapStopPoints}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    text_bus: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});

export default connect(state => ({
        state: state
    }),
    (dispatch) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(Result);