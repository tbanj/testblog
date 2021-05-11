/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Platform, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { getIcon } from '../../lib/iconhelper';
import PlaceList from '../../components/placeList/PlaceList';
import { getPlaces } from '../../store/actions/index';
import startMainTabs from '../maintabs/startMainTabs';


const FindPlaceScreen = (props) => {
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

        // let subscribeState = true;
        // if (subscribeState) { auth().onAuthStateChanged(onAuthStateChanged); }
        const data = getIcon(0);
        console.log('ss', data);

        Navigation.mergeOptions('findPlace', {
            topBar: {
                title: {
                    text: 'Find Place',
                    color: 'white',
                },
                background: {
                    color: '#4d089a',
                },
                leftButtons: {
                    id: 'sideDrawer_findPlace',
                    icon: data[1],
                    color: 'white',
                },
            },
            bottomTab: {
                text: 'Find Place',
                icon: data[0],
                // iconColor: '#FF1493',
                // textColor: '#000',
                selectedIcon: data[0],
                selectedTextColor: '#FF1493',
                selectedIconColor: '#FF1493',
                fontFamily: 'Comfortaa-Regular',
            },


        });
        dispatch(getPlaces());
        const screenEventListener = Navigation.events().registerComponentDidDisappearListener(({ componentId, componentName }) => {
            console.log('componentId, componentName ', componentId, componentName);
            if (componentName === 'awesome-places.MenuScreen') {
                setMenuBtn(true);
            }
        });
        const sidebarEventListener = Navigation.events().registerNavigationButtonPressedListener(({ buttonId }) => {

            if (buttonId === 'sideDrawer_findPlace') {
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

    // useEffect(() => {
    //     const data = getIcon(0);
    //     console.log('nn', data);
    //     const sidebarEventListener = Navigation.events().registerNavigationButtonPressedListener(({ buttonId }) => {
    //         console.log('buttonId nn', buttonId);
    //     })
    //     Navigation.mergeOptions('findPlace', {
    //         topBar: {
    //             title: {
    //                 text: 'Find Place',
    //                 color: 'white',
    //             },
    //             background: {
    //                 color: '#4d089a',
    //             },
    //             leftButtons: {
    //                 id: 'sideDrawer_findPlace',
    //                 icon: data[1],
    //                 color: 'white',
    //             },
    //         },
    //         bottomTab: {
    //             text: 'Find Place',
    //             icon: data[0],
    //             // iconColor: '#FF1493',
    //             // textColor: '#000',
    //             selectedIcon: data[0],
    //             selectedTextColor: '#FF1493',
    //             selectedIconColor: '#FF1493',
    //             fontFamily: 'Comfortaa-Regular',
    //         },
    //         sideMenu: {
    //             left: {
    //                 visible: menuBtn === true ? true : false,
    //                 enabled: true,
    //             },
    //         },


    //     });
    //     return () => {
    //         sidebarEventListener.remove();
    //     }
    // }, [menuBtn]);

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
            <View style={styles.searchButton}><Text style={styles.searchButtonText}>Find Places</Text></View>
        </TouchableOpacity  >
    </Animated.View>);

    if (placesLoaded) {
        content = (<Animated.View style={{
            opacity: placesAnim,
            // transform: [{
            //     scale: placesAnim.interpolate(
            //         {
            //             inputRange: [0, 1],
            //             outputRange: [1, 1],
            //         }),
            // }],
        }}>
            <PlaceList places={places} onItemSelected={(data) => itemSelectedHandler(data)} />
        </Animated.View>);
    }

    const itemSelectedHandler = (data) => {
        const selPlace = places.find(place => place.key === data);
        Navigation.push(props.componentId, {
            component: {
                name: 'awesome-places.Place Detail',
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

    return (
        <View style={placesLoaded ? null : styles.buttonContainer}>
            {content}
            {/* {!placesLoaded && content}
            {placesLoaded && <PlaceList places={places} onItemSelected={(data) => itemSelectedHandler(data)} />} */}
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

export default FindPlaceScreen;

// getMapIcon();
function getMapIcon() {
    try {
        // const data = getIcon(0);
        // const source = await Icon.getImageSource('md-map', 30);
        FindPlaceScreen.options = {
            topBar: {
                title: {
                    text: 'Find Place',
                    color: 'white',
                },
                background: {
                    color: '#4d089a',
                },
            },
            bottomTab: {
                text: 'Find Place',
                icon: <Icon name={'logout'} size={30} color="#aaa" />,
                // iconColor: '#FF1493',
                // textColor: '#000',
                selectedIcon: <Icon name={'logout'} size={30} color="#aaa" />,
                selectedTextColor: '#FF1493',
                selectedIconColor: '#FF1493',
                fontFamily: 'Comfortaa-Regular',
            },
        };
    } catch (error) {
        console.warn('error encounter');

    }
}

