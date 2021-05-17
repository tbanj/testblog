/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    View, ScrollView, StyleSheet,
    Platform, KeyboardAvoidingView,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getIcon } from '../../lib/iconhelper';
import startMainTabs from '../maintabs/startMainTabs';
import TextHeading from '../../components/UI/headingText/HeadingText';
import MainText from '../../components/UI/mainText/MainText';
import ButtonWithBg from '../../components/UI/buttonWithBg/ButtonWithBg';


const ChatRoomScreen = (props) => {
    const [menuBtn, setMenuBtn] = useState(true);

    const dispatch = useDispatch();
    const { news } = useSelector(state => ({
        news: state.news,
    }));


    const switchtoBlog = (newsData) => {
        // goto blog component
        Navigation.push(props.componentId, {
            component: {
                name: 'maja.Place Detail',
                id: 'majablogdetail',
                // title: selPlace.name,
                passProps: newsData,
                options: {
                    topBar: {
                        title: {
                            text: 'back',
                        },
                    },
                },
            },
        });
    }

    // const submitButton = ''
    useEffect(() => {
        const data = getIcon(0);
        Navigation.mergeOptions('chatRoom', {
            topBar: {
                title: {
                    text: 'Chat Room',
                    color: 'white',
                },
                background: {
                    color: '#4d089a',
                },
                /* to make button open a sideMenu Screen, we need to listen to Navigation
                events */
                leftButtons: {
                    id: 'sideDrawer_chatRoom',
                    icon: data[1],
                    color: 'white',
                },

            },
            bottomTab: {
                // text: 'Chat Room',
                icon: data[2],
                selectedIcon: data[2],
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

        const sidebarChatRoomListener = Navigation.events().registerNavigationButtonPressedListener(({ buttonId }) => {
            if (buttonId === 'sideDrawer_chatRoom') {
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

        Navigation.updateProps('majablogdetail', news);
        // unsubscribe sidebarChatRoomListener
        return () => {
            sidebarChatRoomListener.remove();
            screenEventListener.remove();
        };
    }, [menuBtn, news]);


    return (
        <View style={styles.container}>
            <MainText>
                <TextHeading >Chat  with us!</TextHeading>
            </MainText>
            <ButtonWithBg color={'#29aaf4'} onPress={() => switchtoBlog(news)} text={'View Blogs'} />
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
export default ChatRoomScreen;



