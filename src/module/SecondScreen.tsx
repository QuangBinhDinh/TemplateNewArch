import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { goBack, navigate } from './service';
import { Icon } from '@rneui/base';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ThirdScreen from './ThirdScreen';

const Tab = createBottomTabNavigator();

const SecondScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View
                style={{ width: '100%', height: 60, flexDirection: 'row', borderBottomWidth: 1, alignItems: 'center' }}
            >
                <Pressable hitSlop={12} onPress={goBack}>
                    <Icon type="antdesign" name="arrowleft" size={22} style={{ marginLeft: 20 }} />
                </Pressable>
                <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 20 }}>Second screen</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Tab.Navigator screenOptions={{ headerShown: false, lazy: false }}>
                    <Tab.Screen
                        options={{ title: 'Screen1', tabBarIcon: () => <Icon type="feather" name="home" size={20} /> }}
                        name="ThirdScreen1"
                        component={ThirdScreen}
                    />
                    <Tab.Screen
                        options={{ title: 'Screen2', tabBarIcon: () => <Icon type="feather" name="user" size={20} /> }}
                        name="ThirdScreen2"
                        component={ThirdScreen}
                    />
                </Tab.Navigator>
            </View>
        </View>
    );
};

export default SecondScreen;
