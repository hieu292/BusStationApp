import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
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
            Actions.error("Just enter number greater than 0");
        }
    }
    _checkNumeric(text){
        var numberInput = Number(text);
        if(!isNaN(numberInput)){
            this.state.numberBus = numberInput;
            return true;
        } else {
            Actions.error("Just enter number greater than 0");
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
                ><Text style={styles.text_input}>{this.state.numberBus}</Text></TextInput>
                <TouchableOpacity style={styles.button_search} onPress={this._fetchSearchBus.bind(this)}>
                    <Text style={styles.text_search}>Search</Text>
                </TouchableOpacity>
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
    },
    button_search: {
        justifyContent: 'center',
        marginTop: 30,
        width:150,
        height: 70,
        borderWidth: 2,
        borderColor: 'red'
    },
    text_search: {
        color: '#e65c00',
        textAlign: 'center',
        fontSize: 30
    },
    text_input: {
        fontSize:70,
        color: '#ff9900'
    }

});

export default connect(state => ({
        state: state
    })
)(Home);