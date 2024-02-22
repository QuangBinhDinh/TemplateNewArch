import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import Store from '@store/store';
import Router from './navigation';

LogBox.ignoreAllLogs();

const App = () => {
    return (
        <Provider store={Store}>
            <Router></Router>
        </Provider>
    );
};

export default App;
