/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
    View, StyleSheet, ImageBackground, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback,
    Keyboard, ActivityIndicator,
} from 'react-native';

import HeadingText from '../../components/UI/headingText/HeadingText';
import MainText from '../components/UI/mainText/MainText';

class HomeContent extends Component {
    state = {}
    render() {
        let headingText = null;
        if (Dimensions.get('window').height > 500) {
            headingText = (<MainText>
                <HeadingText style={styles.HeadingText}>Please Login</HeadingText>
            </MainText>);
        }

        return (<View></View>);
    }
}


const styles = StyleSheet.create({
    root: {

        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'whitesmoke',
    },
    container: {

        justifyContent: 'center',
        flex: 1,
        // width: '80%',
        alignItems: 'center',
        // paddingLeft: 10,
        // paddingRight: 10,
    },
    textHeading: {
        fontWeight: 'bold',
        fontSize: 28,
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb',
    },
    inputContainer: {
        width: '80%',
    },
    background: {
        width: '100%',
        flex: 1,
    },
    buttonM: {
        // padding: 15,
        // backgroundColor: 'white',
        // borderColor: 'red',
        // color: 'white',
    },
    loginScreenButton: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#2196F3',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    button: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#2196F3',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    loginText: {
        color: 'black',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    landscapePwdContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    portraitPwdContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    landscapePwdWrapper: {
        width: '45%',
    },
    portraitPwdWrapper: {
        width: '100%',
    },

});

export default HomeContent;
