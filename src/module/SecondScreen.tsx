import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { goBack, navigate } from '@navigation/service';
import { Icon } from '@rneui/base';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
                    onPress={goBack}
                >
                    <Icon type="antdesign" name="arrowleft" size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 20 }}>Second screen</Text>
            </View>
        </View>
    );
};

export default SecondScreen;
