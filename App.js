/* eslint-disable prettier/prettier */
/* https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import startMainTabs from './src/screens/maintabs/startMainTabs';
import Home from './src/screens/home/Home';
import AuthScreen from './src/screens/Auth';
// import startMainTabs from './src/screens/maintabs/startMainTabs';
import ChatDetail from './src/screens/chatdetail/ChatDetail';
import ChatRoom from './src/screens/chatRoom/ChatRoom';
import LocationScreen from './src/screens/location/Location.js';
import UserScreen from './src/screens/user/User';

import configureStore from './src/store/configureStore';
import MenuScreen from './src/screens/menu/MenuScreen';

const store = configureStore();

// Register screens: below are components which u can only attach redux state to
Navigation.registerComponent('AuthScreen', () => (props) => (
    <Provider store={store}>
        <AuthScreen {...props} />
    </Provider>
), () => AuthScreen);

Navigation.registerComponent('maja.ChatRoom', () => (props) => (
    <Provider store={store}>
        <ChatRoom {...props} />
    </Provider>
), () => ChatRoom);

Navigation.registerComponent('maja.home', () => (props) => (
    <Provider store={store}>
        <Home {...props} />
    </Provider>
), () => Home);

Navigation.registerComponent('maja.Place Detail', () => (props) => (
    <Provider store={store}>
        <ChatDetail {...props} />
    </Provider>
), () => ChatDetail);

Navigation.registerComponent('maja.MenuScreen', () => (props) => (
    <Provider store={store}>
        <MenuScreen {...props} />
    </Provider>
), () => MenuScreen);


Navigation.registerComponent('maja.location', () => (props) => (
    <Provider store={store}>
        <LocationScreen {...props} />
    </Provider>
), () => LocationScreen);

Navigation.registerComponent('maja.user', () => (props) => (
    <Provider store={store}>
        <UserScreen {...props} />
    </Provider>
), () => UserScreen);




Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot(startMainTabs);
});




