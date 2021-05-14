/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Platform, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useSelector, useDispatch } from 'react-redux';
import { getIcon } from '../../lib/iconhelper';
import PlaceList from '../../components/placeList/PlaceList';
import { getPlaces } from '../../store/actions/index';
import startMainTabs from '../maintabs/startMainTabs';
import TextHeading from '../../components/UI/headingText/HeadingText';
import MainText from '../../components/UI/mainText/MainText';
import ButtonWithBg from '../../components/UI/buttonWithBg/ButtonWithBg';


const HomeScreen = (props) => {
    const dispatch = useDispatch();
    const [placesLoaded, setPlacesLoaded] = useState(false);
    const [removeAnim] = useState(new Animated.Value(1));
    const [placesAnim] = useState(new Animated.Value(0));
    const [menuBtn, setMenuBtn] = useState(true);
    const { places } = useSelector(state => ({
        places: state.places.places,
    }));
    const [user, setUser] = useState();



    useEffect(() => {
        const data = getIcon(0);
        Navigation.mergeOptions('home', {
            topBar: {
                title: {
                    text: 'Home',
                    color: 'white',
                },
                background: {
                    color: '#4d089a',
                },
                leftButtons: {
                    id: 'sideDrawer_home',
                    icon: data[1],
                    color: 'white',
                },
            },
            bottomTab: {
                // text: 'Find Place',
                icon: data[0],
                selectedIcon: data[0],
                // selectedTextColor: '#FF1493',
                selectedIconColor: '#000000',
                fontFamily: 'Comfortaa-Regular',
                iconColor: '#808080',
            },
        });
        dispatch(getPlaces());
        const screenEventListener = Navigation.events().registerComponentDidDisappearListener(({ componentId, componentName }) => {

            if (componentName === 'maja.MenuScreen') {
                setMenuBtn(true);
            }
        });
        const sidebarEventListener = Navigation.events().registerNavigationButtonPressedListener(({ buttonId }) => {

            if (buttonId === 'sideDrawer_home') {
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


        function onAuthStateChanged(data) { setUser(data); }
        return () => {
            // unsubscribe sidebarEventListener
            sidebarEventListener.remove();
            screenEventListener.remove();

        };
    }, [menuBtn, dispatch, user]);


    const placesLoadedHandler = () => {
        Animated.timing(placesAnim, {
            toValue: 1, duration: 500, useNativeDriver: true,
        }).start();
    };

    const placesSearchHandler = () => {
        Animated.timing(removeAnim,
            { toValue: 0, duration: 500, useNativeDriver: true }).start(() => {
                setPlacesLoaded(true);
                placesLoadedHandler();
            });
    };

    // scale: removeAnim
    let content = (<Animated.View style={{
        opacity: removeAnim,
        transform: [{
            scale: removeAnim.interpolate(
                {
                    inputRange: [0, 1],
                    outputRange: [12, 1],
                }),
        }],
    }}>
        <TouchableOpacity onPress={() => placesSearchHandler()}>
            <View style={styles.searchButton}><Text style={styles.searchButtonText}>Click for Updated News</Text></View>
        </TouchableOpacity  >
    </Animated.View>);

    if (placesLoaded) {
        content = (<Animated.View style={{
            opacity: placesAnim,
        }}>
            <Text>how are you</Text>
            <PlaceList places={places} onItemSelected={(data) => itemSelectedHandler(data)} />
        </Animated.View>);
    }

    const itemSelectedHandler = (data) => {
        const selPlace = places.find(place => place.key === data);
        Navigation.push(props.componentId, {
            component: {
                name: 'maja.Place Detail',
                title: selPlace.name,
                passProps: { selectedPlace: selPlace },
                options: {
                    topBar: {
                        title: {
                            text: selPlace.name,
                        },
                    },
                },
            },
        });

    };

    const switchtoBlog = () => {
        console.log('I click on you home');
        Navigation.mergeOptions('BOTTOM_TABS_MAJABLOG', {
            bottomTabs: {
                currentTabIndex: 1,
            },
        });
    };

    return (
        <View style={styles.buttonContainer}>
            {/* {content} */}
            {/* {!placesLoaded && content}
            {placesLoaded && <PlaceList places={places} onItemSelected={(data) => itemSelectedHandler(data)} />} */}

            <MainText>
                <TextHeading >Home Slide</TextHeading>
            </MainText>
            <ButtonWithBg color={'#29aaf4'} onPress={() => switchtoBlog()} text={'Go to Blog Slide'} />
        </View>
    );
};

const styles = StyleSheet.create({
    searchButton: {
        borderColor: '#FF1493',
        borderWidth: 3,
        borderRadius: 50,
        padding: 20,
    },
    searchButtonText: {
        color: '#FF1493',
        fontWeight: 'bold',
        fontSize: 26,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;


