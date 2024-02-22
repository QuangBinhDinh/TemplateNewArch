import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { navigate } from '../navigation/service';
import { Icon } from '@rneui/base';

const FirstScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, color: 'black' }}>This is the first screen</Text>

            <Pressable
                style={{
                    marginTop: 30,
                    width: 240,
                    height: 64,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#ff7300',
                }}
                onPress={() => navigate('SecondScreen')}
            >
                <Text style={{ fontSize: 16, color: 'white' }}>Navigate</Text>
            </Pressable>

            <Icon size={30} type="feather" name="heart" />
        </View>
    );
};

export default FirstScreen;
