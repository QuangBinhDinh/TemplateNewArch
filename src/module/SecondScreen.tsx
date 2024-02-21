import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { goBack, navigate } from './service';
import { Icon } from '@rneui/base';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ThirdScreen from './ThirdScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomTabBar from './CustomTabBar';
import FourthScreen from './FourthScreen';

const Tab = createBottomTabNavigator();

const SecondScreen = () => {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'white',
                paddingTop: insets.top / 2,
                paddingBottom: insets.bottom / 2,
            }}
        >
            <View
                style={{ width: '100%', height: 60, flexDirection: 'row', borderBottomWidth: 1, alignItems: 'center' }}
            >
                <TouchableOpacity
                    style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => navigate('FirstScreen')}
                >
                    <Icon type="antdesign" name="arrowleft" size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 20 }}>Second screen</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Tab.Navigator
                    screenOptions={{ headerShown: false, lazy: false }}
                    tabBar={props => <CustomTabBar {...props} />}
                >
                    <Tab.Screen
                        options={{ title: 'Screen1', tabBarIcon: () => <Icon type="feather" name="home" size={20} /> }}
                        name="ThirdScreen1"
                        component={ThirdScreen}
                    />
                    <Tab.Screen
                        options={{ title: 'Screen2', tabBarIcon: () => <Icon type="feather" name="user" size={20} /> }}
                        name="ThirdScreen2"
                        component={FourthScreen}
                    />
                </Tab.Navigator>
            </View>
        </View>
    );
};

export default SecondScreen;
