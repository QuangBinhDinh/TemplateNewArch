import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { navigate } from './service';
import { Icon } from '@rneui/base';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

const ThirdScreen = () => {
    const [moving, setMoving] = useState(false);

    const finishAnimation = () => {
        setMoving(false);
    };
    const transX = useSharedValue(0);

    const transY = useSharedValue(0);

    const animStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: transX.value }, { translateY: transY.value }],
    }));

    const animate1 = () => {
        setMoving(true);

        transX.value = withSequence(
            withTiming(-100, { duration: 200 }),
            withDelay(500, withTiming(100, { duration: 1000 })),
            withDelay(
                500,
                withTiming(0, { duration: 200 }, () => {
                    runOnJS(finishAnimation)();
                }),
            ),
        );

        transY.value = withSequence(
            withDelay(200, withTiming(-240, { duration: 500 })),
            withDelay(1000, withTiming(0, { duration: 500 })),
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, color: 'black', marginTop: 40 }}>This is the third screen</Text>

            <AnimatedButton onPress={() => console.log('Press me')} style={[styles.mainButton, animStyle]}>
                <Text style={{ fontSize: 16, color: 'white' }}>Animated Buton Test</Text>
            </AnimatedButton>

            <Icon size={30} type="feather" name="heart" />

            <View style={{ width: '96%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <Pressable style={[styles.button, { backgroundColor: 'blue' }]} onPress={animate1} disabled={moving}>
                    <Text style={styles.text}>Action 1</Text>
                </Pressable>

                <Pressable style={[styles.button, { backgroundColor: 'green' }]}>
                    <Text style={styles.text}>Action 2</Text>
                </Pressable>

                <Pressable style={[styles.button, { backgroundColor: 'purple' }]}>
                    <Text style={styles.text}>Action 3</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default ThirdScreen;

const styles = StyleSheet.create({
    mainButton: {
        marginTop: 250,
        width: 240,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff7300',
    },
    button: {
        width: '30%',
        height: 44,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});
