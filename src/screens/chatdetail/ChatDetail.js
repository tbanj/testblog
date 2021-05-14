/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// /* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text, Image,
    TouchableHighlight,
    View, Platform, Dimensions, ScrollView,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import { deletePlace } from '../../store/actions/index';
import HeadingText from '../../components/UI/headingText/HeadingText';
import MainText from '../../components/UI/mainText/MainText';
import { TextInput } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';

const ChatDetail = (props) => {
    const dispatch = useDispatch();
    const [searchContent, setSearchContent] = useState(null)
    const [focusedLocation, setFocusedLocation] = useState({
        // 37.7900352, -122.4013726,
        latitude: 37.7900352,
        longitude: -122.4013726,
        latitudeDelta: 0.0122,
        longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122,
    });
    // delete with key assigned to it
    const deletePlaceHandler = (key, fileName) => {
        dispatch(deletePlace(key, fileName));
        // is use to return to previous component or route which takes us to this present component
        Navigation.pop(props.componentId);
    };

    useEffect(() => {
        if (props.selectedPlace !== undefined) {
            setFocusedLocation({
                ...props.selectedPlace.location,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122,
            });
        }
        return () => {
        }
    }, [props.selectedPlace]);
    return (
        <ScrollView keyboardShouldPersistTaps="always">
            {/* <View style={styles.centeredView}>
                <Text>List View</Text>

            </View> */}
            <View style={styles.root}>
                <MainText>
                    <HeadingText style={styles.fz}>Search</HeadingText>
                </MainText>
                <TextInput
                    style={styles.inputContainer}
                    onChangeText={(val) => {
                        setSearchContent(val);
                        console.log('val', val);
                    }}
                    value={searchContent}
                    placeholder="Search by user or placeholder"
                    keyboardType="default"
                    placeholderTextColor="#808080"
                />

                <MainText>
                    <HeadingText style={styles.fz}>Blogs</HeadingText>
                </MainText>

                {/* blog new list */}
                <View style={[styles.blogParent, styles.parentSt]} >
                    <View style={styles.smContainer}>
                        <Image
                            style={styles.blogImg}
                            source={{
                                uri: 'https://reactnative.dev/img/tiny_logo.png',
                            }}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={[styles.mdContainer, styles.blogText]}>
                        <View style={styles.blogTxt}><Text>Alex</Text></View>
                        <View><Text>Hey when are you going?</Text></View>
                    </View>
                    <View style={[styles.smContainer, styles.blogText]}>
                        <View style={[styles.blogTxt, styles.activeBlogBox]}><Text >9:45am</Text></View>
                        <View style={[styles.activeBlogBox]}><View style={[styles.activeBlog]} /></View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'flex-start',
        marginTop: 15,
        marginBottom: 5,
        marginStart: 15,
        marginEnd: 15,
    },
    modalView: {
        // margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 26,
    },
    imageSize: {
        width: '100%', height: 230, marginBottom: 10, flex: 1,
    },
    mapHeight: { width: '100%', height: 230 },
    bw: { borderWidth: 1 },
    inputContainer: {
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#ddd',
        borderBottomWidth: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        fontSize: 25,
        paddingHorizontal: 25,
        height: 60,


    },
    blogParent: {
        display: 'flex',
        flex: 1
    },
    parentSt: {
        // alignItems: 'stretch',
        flexDirection: 'row',
        marginVertical: 10,
    },
    smContainer: {
        flexGrow: 1,
    },
    mdContainer: {
        flexGrow: 6,
    },
    blogImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    fz: { fontSize: 28 },
    activeBlog: {
        width: 15,
        height: 15,
        borderRadius: 50,
        backgroundColor: '#4d089a',

    },
    activeBlogBox: {
        display: 'flex',
        flexDirection: 'row-reverse',

    },
    blogText: {
        marginVertical: 5,
        marginHorizontal: 5,
    },
    blogTxt: {
        marginBottom: 8,
    },
});

export default ChatDetail;
