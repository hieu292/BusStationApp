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

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {numberBus: 0};
    }
    _fetchSearchBus(){
        if(!isNaN(this.state.numberBus) && this.state.numberBus > 0){
            var data = this.state.numberBus;
            Actions.selectScreen({data: data});
        } else {
            Actions.error("Just enter number");
        }
    }
    _checkNumeric(text){
        var numberInput = Number(text);
        if(!isNaN(numberInput)){
            this.state.numberBus = numberInput
            return true;
        } else {
            Actions.error("Just enter number");
            return false;
        }
        
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text_bus}>
                    Enter Bus Number
                </Text>
                <TextInput
                    style={{height: 140, width: 200, borderWidth: 0}}
                    onChangeText={(text) => this._checkNumeric(text)}
                />
                <TouchableHighlight onPress={this._fetchSearchBus.bind(this)}>
                    <Text>Search</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text_bus: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

export default connect(state => ({
        state: state
    })
)(Home);