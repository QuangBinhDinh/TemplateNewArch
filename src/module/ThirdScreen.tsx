import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { navigate } from './service';
import { Icon } from '@rneui/base';

const ThirdScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, color: 'black' }}>This is the third screen</Text>

            <TouchableOpacity
                onPress={() => console.log('Press me')}
                style={{
                    marginTop: 30,
                    width: 240,
                    height: 64,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#ff7300',
                }}
            >
                <Text style={{ fontSize: 16, color: 'white' }}>Button test</Text>
            </TouchableOpacity>

            <Icon size={30} type="feather" name="heart" />
        </View>
    );
};

export default ThirdScreen;
