import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from "react-native";
import {Actions} from "react-native-router-flux";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/SearchBus';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    }
});


class Select extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const {state, actions, data } = this.props;
        if(state.bus.bus.length == 0){
            actions.fetchBus(data);
        }

    }
    _fetchSearchBus(id, name){
        const data = {id, name};
        Actions.resultScreen({data: data});
    }
    render(){
        const bus = this.props.state.bus.bus;
        let mapBus;
        if(bus.length > 0){
            mapBus = bus.map(b => (<TouchableHighlight onPress={this._fetchSearchBus(b.id, b.name)}>
                <Text>{b.name}</Text>
            </TouchableHighlight>));
        } else {
            mapBus = <Text>Don't have StopPoint. Error Massage: {this.props.bus.error.message}</Text>
        }

        return (
            <View style={[styles.container, this.props.style]}>
                <Text>Stops for : {this.props.data}</Text>
                {mapBus}
            </View>
        );
    }
}

export default connect(state => ({
        state: state
    }),
    (dispatch) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(Select);