import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet, ListView, Image} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/SearchBus';
import {Actions} from "react-native-router-flux";

class Select extends React.Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {
        const {state, actions, data } = this.props;
        if(state.bus.bus.length == 0) {
            actions.fetchBus(data);
        }

    }
    

    _renderRow(props){
        return (
            <TouchableHighlight style={styles.list_view} key={props.id} onPress={() => {
            const data = {id: props.id, name: props.name};
            Actions.resultScreen({data: data})}}>
                <Text style={styles.text_list_view}>{props.name}</Text>
            </TouchableHighlight>

        );
    }
    
    render(){
        let bus = this.props.state.bus.bus;
        let fetched = this.props.state.bus.fetched;
        let error = this.props.state.bus.error;
        let mapBus;
        if(!fetched){
            mapBus = (<Text style={styles.text_wait}>Waiting...</Text>);
        } else {
            if(bus.length > 0){
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.state = {
                    dataSource: ds.cloneWithRows(this.props.state.bus.bus),
                };
                mapBus = (<ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                />);
            } else {
                mapBus = <Text>Don't have StopPoint.</Text>
                if(error)
                    mapBus += <Text style={styles.error}>Error Massage: {this.props.bus.error.message}</Text>

            }
        }

        return (
            <View style={styles.container}>
                <View style={styles.view_header}>
                    <View style={styles.view_header_top}>
                        <TouchableHighlight style={styles.clickButtonBack} onPress={Actions.pop}>
                            <Image
                                style={styles.image}
                                source={require('./img/back.png')}
                            />
                        </TouchableHighlight>
                        <Text style={styles.select_stop}>Select Stop</Text>
                    </View>
                    <Text style={styles.text_stop}>Stops for : {this.props.data}</Text>
                </View>
                <View style={styles.body_row}>
                    {mapBus}
                </View>
            </View>
        );


    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    view_header: {
        flex: 1,
    },
    view_header_top: {
        flexDirection: 'row',
        flex: 1,
        borderWidth: 1,
        borderBottomColor: 'red',
    },
    select_stop: {
        flex: 5,
        textAlign: 'center',
        fontSize: 25,
    },
    clickButtonBack: {
        flex: 1,
        margin: 5,
    },
    text_stop: {
        flex: 1,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'red'
    },
    list_view: {
        height: 60,
        borderColor: '#ffa31a',
        borderWidth: 0.5,
    },
    text_list_view: {
        textAlign: 'center',
        fontSize: 20
    },
    list_view_space: {
        marginTop: 5,
        marginBottom: 5
    },
    body_row: {
        flex: 7
    },
    separator: {
        flex: 1,
        height: 10,
    },
    text_wait: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20
    },
    error: {
        color: 'red'
    },
    image: {
        height: 30,
        width: 30
    }
});
export default connect(state => ({
        state: state
    }),
    (dispatch) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(Select);