import React from 'react';
import {View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity} from "react-native";
import {Actions} from "react-native-router-flux";

var {
  height: deviceHeight
} = Dimensions.get("window");

var styles = StyleSheet.create({
    container: {
        position: "absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:"transparent",
        justifyContent: "center",
        alignItems: "center",
    },
    view: {
        width:250,
        height:250,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"white"
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        color: 'red'
    },
    close_button:{
        marginTop: 40,
        textAlign: 'center',
        color: '#ff9900'
    }
});

export default class extends React.Component {
    constructor(props){
        super (props);

        this.state = {
            offset: new Animated.Value(-deviceHeight)
        };
    }

    componentDidMount() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: 0
        }).start();
    }

    closeModal() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: -deviceHeight
        }).start(Actions.pop);
    }

    render(){
        return (
            <Animated.View style={[styles.container, {backgroundColor:"rgba(52,52,52,0.5)"},
                                  {transform: [{translateY: this.state.offset}]}]}>
                <View style={styles.view}>
                    <Text style={styles.title}>{this.props.data}</Text>
                    <TouchableOpacity  onPress={this.closeModal.bind(this)}>
                        <Text style={styles.close_button}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    }
}
