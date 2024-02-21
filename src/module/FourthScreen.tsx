import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { navigate } from './service';
import { Icon } from '@rneui/base';

const FourthScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, color: 'black' }}>This is the fourth screen</Text>

            <Pressable
                style={{
                    marginTop: 30,
                    width: 240,
                    height: 64,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#2792ce',
                }}
            >
                <Text style={{ fontSize: 16, color: 'white' }}>Another test</Text>
            </Pressable>

            <Icon size={30} type="feather" name="heart" />
        </View>
    );
};

export default FourthScreen;
