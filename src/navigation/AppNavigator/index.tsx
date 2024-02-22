import React from 'react';
import { Icon } from '@rneui/base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ThirdScreen from '../../module/ThirdScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FourthScreen from '../../module/FourthScreen';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false, lazy: false }}
            tabBar={props => <CustomTabBar {...props} />}
        >
            <Tab.Screen
                options={{ title: 'Screen1', tabBarIcon: () => <Icon type="feather" name="home" size={20} /> }}
                name="ThirdScreen"
                component={ThirdScreen}
            />
            <Tab.Screen
                options={{ title: 'Screen2', tabBarIcon: () => <Icon type="feather" name="user" size={20} /> }}
                name="FourthScreen"
                component={FourthScreen}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;
