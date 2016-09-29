import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    ListView,
    Image
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
    _renderRowStop(props){
        return (
            <View style={styles.box_view}>
                <Text key={props.id} style={styles.text_box}>{props.destinationName} {props.expectedArrival.substring(11,16)} </Text>
                <Text style={styles.text_minutes}>{Math.round(props.timeToStation/60)} min</Text>
            </View>
        );
    }
    render() {
        let stopPoints = this.props.state.stopPoints.stopPoints;
        let fetched = this.props.state.stopPoints.fetched;
        let error = this.props.state.stopPoints.error;
        let mapStopPoints;

        if(!fetched){
            mapStopPoints = (<Text style={styles.text_wait}>Waiting...</Text>);
        } else {
            if(stopPoints.length > 0){
                const sortStopPoints = stopPoints.sort(function (a, b) {
                    if(a.timeToStation > b.timeToStation){
                        return 1
                    }
                    if(a.timeToStation < b.timeToStation){
                        return -1
                    }
                    if(a.timeToStation == b.timeToStation){
                        return 0
                    }
                })
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.state = {
                    dataSource: ds.cloneWithRows(sortStopPoints),
                };
                // mapStopPoints = sortStopPoints.map(b => <Text key={b.id}>{b.destinationName} {b.expectedArrival.substring(11,16)} {Math.round(b.timeToStation/60)}</Text>);
                mapStopPoints = (
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRowStop}
                        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                    />
                );
            } else {
                mapStopPoints = <Text>Don't have StopPoint. </Text>;
                if(error)
                    mapStopPoints += <Text>Error Massage: {this.props.stopPoints.error.message}</Text>
            }
        }
        return (
            <View style={styles.container}>
                <View style={styles.view_header}>
                    <TouchableHighlight style={styles.button_left} onPress={Actions.pop}>
                        <Image
                            style={styles.image}
                            source={require('./img/back.png')}
                        />
                    </TouchableHighlight>
                    
                    <Text style={styles.text_bus}>
                        {this.props.data.name}
                    </Text>
                    <TouchableHighlight style={styles.button_right} onPress={Actions.homeScreen}>
                        <Image
                            style={styles.image}
                            source={require('./img/home.png')}
                        />
                    </TouchableHighlight>
                </View>

                <View style={styles.view_body}>
                    {mapStopPoints}
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    view_header:{
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderBottomColor: 'red',
        backgroundColor: 'yellow'
    },
    view_body: {
        flex: 10,
    },
    text_wait: {
        justifyContent: 'center',
        textAlign: 'center'
    },
    text_bus: {
        flex: 11,
        fontSize: 20,
        textAlign: 'center',
        margin: 5,
        color: '#ff9900'
    },
    image: {
        height: 35,
        width: 35
    },
    button_left: {
        flex: 1,
        margin: 5,
    },
    button_right: {
        flex: 1,
        margin: 5,
    },
    box_view: {
        height: 60,
        borderBottomColor: '#ffa31a',
        borderWidth: 0.5
    },
    text_box: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    text_minutes: {
        fontSize: 20,
        color: 'blue'
    }


});

export default connect(state => ({
        state: state
    }),
    (dispatch) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(Result);