/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    View, ScrollView, StyleSheet,
    Platform, KeyboardAvoidingView,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useDispatch } from 'react-redux';
import { getIcon } from '../../lib/iconhelper';
import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/placeInput/PlaceInput';
import startMainTabs from '../maintabs/startMainTabs';
import TextHeading from '../../components/UI/headingText/HeadingText';
import MainText from '../../components/UI/mainText/MainText';


const LocationScreen = (props) => {
    const [menuBtn, setMenuBtn] = useState(true);

    const dispatch = useDispatch();


    const placeAddedHandler = (data) => {
        dispatch(addPlace(data));
    };


    // const submitButton = ''
    useEffect(() => {
        const data = getIcon(0);
        Navigation.mergeOptions('location', {
            topBar: {
                title: {
                    text: 'Location',
                    color: 'white',
                },
                background: {
                    color: '#4d089a',
                },
                /* to make button open a sideMenu Screen, we need to listen to Navigation
                events */
                leftButtons: {
                    id: 'sideDrawer_location',
                    icon: data[1],
                    color: 'white',
                },

            },
            bottomTab: {
                // text: 'location',
                icon: data[3],
                selectedIcon: data[3],
                // selectedTextColor: '#FF1493',
                selectedIconColor: '#000000',
                fontFamily: 'Comfortaa-Regular',
                iconColor: '#808080',
            },
        });

        const screenEventListener = Navigation.events().registerComponentDidDisappearListener(({ componentId, componentName }) => {


            if (componentName === 'maja.MenuScreen') {
                setMenuBtn(true);
            }
        });
        // // Unsubscribe

        const sidebarLocationListener = Navigation.events().registerNavigationButtonPressedListener(({ buttonId }) => {
            if (buttonId === 'sideDrawer_location') {
                if (Platform.OS === 'android') {
                    Navigation.mergeOptions(startMainTabs.root.sideMenu.id, {
                        sideMenu: {
                            left: {
                                visible: true,
                                enabled: true,
                            },
                        },
                    });
                    return;
                }
                Navigation.mergeOptions(startMainTabs.root.sideMenu.id, {
                    sideMenu: {
                        left: {
                            visible: menuBtn === true ? true : false,
                            enabled: true,
                        },
                    },
                });

                function toggleMenuBtn() {
                    setMenuBtn(menuBtn === false ? true : false);
                }
                toggleMenuBtn();
            }
        });


        // unsubscribe sidebarChatRoomListener
        return () => {
            sidebarLocationListener.remove();
            screenEventListener.remove();
        };
    }, [menuBtn]);


    return (


        <ScrollView keyboardShouldPersistTaps="always">
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.header}>
                    <MainText>
                        <TextHeading >Location  with us!</TextHeading>
                    </MainText>
                </View>

                <View style={[styles.placeholder]} />



                <PlaceInput onAddPlace={() => placeAddedHandler()} />
            </KeyboardAvoidingView>
        </ScrollView>





    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
    },
    testDiv: { flex: 1 },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    mb: { marginBottom: 10 },
    placeholder: {
        borderColor: 'black',
        width: '80%',

    },
    imgHeight: { height: 150 },

    previewImage: {
        width: '100%',
        height: '100%',
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
    placeImage: { marginRight: 8, height: 30, width: 30 },
});
export default LocationScreen;



