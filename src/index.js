import React from 'react';
//import {Platform, StyleSheet, Text, View} from 'react-native';
import Routes from './routes';
import { Provider } from 'react-redux'
import store from './redux/store'
//import { YellowBox } from 'react-native';
/*
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket'
])*/

export default function App() {
    // return false;
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    )
}