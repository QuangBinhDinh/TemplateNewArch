import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ThirdScreen from '../../module/ThirdScreen';
import CustomTabBar from './CustomTabBar';
import { User, UserFill, Home, HomeFill } from '@assets/svg';
import HomeScreen from '../../module/home';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false, lazy: false }}
            tabBar={props => <CustomTabBar {...props} />}
        >
            <Tab.Screen
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => {
                        if (focused) return <HomeFill width={24} height={24} />;
                        else return <Home width={24} height={24} />;
                    },
                }}
                name="HomeScreen"
                component={HomeScreen}
            />
            <Tab.Screen
                options={{
                    title: 'You',
                    tabBarIcon: ({ focused }) => {
                        if (focused) return <UserFill width={24} height={24} />;
                        else return <User width={24} height={24} />;
                    },
                }}
                name="UserScreen"
                component={ThirdScreen}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;
