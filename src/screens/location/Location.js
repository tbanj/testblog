/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    View, ScrollView, StyleSheet,
    Platform, KeyboardAvoidingView,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useDispatch } from 'react-redux';
import { getIcon } from '../../lib/iconhelper';
import startMainTabs from '../maintabs/startMainTabs';
import TextHeading from '../../components/UI/headingText/HeadingText';
import MainText from '../../components/UI/mainText/MainText';
import ButtonWithBg from '../../components/UI/buttonWithBg/ButtonWithBg';


const LocationScreen = (props) => {
    const [menuBtn, setMenuBtn] = useState(true);

    const dispatch = useDispatch();




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


        // unsubscribe sidebarLocationListener
        return () => {
            sidebarLocationListener.remove();
            screenEventListener.remove();
        };
    }, [menuBtn]);

    const switchtoBlog = () => {
        Navigation.mergeOptions('BOTTOM_TABS_MAJABLOG', {
            bottomTabs: {
                currentTabIndex: 1,
            },
        });
    };
    return (

        <View style={styles.container}>
            <MainText>
                <TextHeading >Location Slide</TextHeading>
            </MainText>
            <ButtonWithBg color={'#29aaf4'} onPress={() => switchtoBlog()} text={'Go to Blog Slide'} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mb: { marginBottom: 10 },
    placeImage: { marginRight: 8, height: 30, width: 30 },
});
export default LocationScreen;



