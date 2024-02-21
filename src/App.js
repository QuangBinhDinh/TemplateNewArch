import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { navigationRef } from './module/service';
import FirstScreen from './module/FIrstScreen';
import SecondScreen from './module/SecondScreen';
import { TransitionPresets } from '@react-navigation/stack';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();
const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            >
                <Stack.Screen name="FirstScreen" component={FirstScreen} />
                <Stack.Screen name="SecondScreen" component={SecondScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
