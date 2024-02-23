import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { navigationRef } from './service';
import { TransitionPresets } from '@react-navigation/stack';
import BottomTabs from './AppNavigator';
import SearchResult from '@searchResult/index';
import ProductCategory from '@searchResult/ProductCategory';

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
                <Stack.Screen name="SearchResult" component={SearchResult} />
                <Stack.Screen name="ProductCategory" component={ProductCategory} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;
