import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { navigationRef } from './service';
import SecondScreen from '../module/SecondScreen';
import { TransitionPresets } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import BottomTabs from './AppNavigator';

const Stack = createStackNavigator();

const Router = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            >
                <Stack.Screen name="App" component={BottomTabs} />
                <Stack.Screen name="SecondScreen" component={SecondScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;
