import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { goBack, navigate } from './service';

const SecondScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ width: '100%', height: 80, flexDirection: 'row', borderBottomWidth: 1 }}></View>
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, color: 'black' }}>This is the second screen</Text>
                <Pressable
                    style={{
                        marginTop: 30,
                        width: 240,
                        height: 64,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#ff7300',
                    }}
                    onPress={goBack}
                >
                    <Text style={{ fontSize: 16, color: 'white' }}>Go back</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default SecondScreen;
