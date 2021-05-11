/* eslint-disable prettier/prettier */
/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
// import { Provider } from 'react-redux';
import { getIcons } from './src/lib/iconhelper';
import App from './App';
// import configureStore from './src/store/configureStore';
// const store = configureStore();

// const RNRedux = () => (
//     <Provider store={store}>
//         <App />
//     </Provider>);
let RNRedux;
async function getApp() {
    return await Promise.all([getIcons()]).then(() => { RNRedux = () => (< App />) });
}
getApp();
// RNRedux = getApp();
// const RNRedux = () => (< App />);
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => RNRedux);
