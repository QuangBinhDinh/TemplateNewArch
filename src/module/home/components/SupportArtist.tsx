import { TextNormal, TextSemiBold } from '@components/text';
import { lightColor } from '@styles/color';
import { SCREEN_WIDTH } from '@util/index';
import React, { memo, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import EventEmitter from '../../../EventEmitter';

const AnimPressable = Animated.createAnimatedComponent(Pressable);

const EVENT_NAME = 'SWIPE_CARD_TO_LEFT';

const CARD_WIDTH = (SCREEN_WIDTH - 32) / 2;
const SupportArtist = () => {
    const toSelling = () => {};
    return (
        <View style={styles.container}>
            <TextSemiBold style={{ fontSize: 20, lineHeight: 26 }}>
                Support independent{'\n'}
                <TextSemiBold style={{ color: lightColor.secondary, fontSize: 20 }}>Artists </TextSemiBold>and
                <TextSemiBold style={{ color: lightColor.secondary, fontSize: 20 }}> Crafters</TextSemiBold>
            </TextSemiBold>

            <TextNormal style={{ fontSize: 15, marginTop: 14 }}>
                There’s no <TextNormal style={{ color: lightColor.secondary }}>Printerval</TextNormal> warehouse – all
                products belong to creative artists and crafters. We are just a bridge to connect you with dedicated
                makers and get eye-catching pieces.
            </TextNormal>

            <CardSlider />
            {/* <FancyButton style={styles.button} backgroundColor={lightColor.primary} onPress={toSelling}>
                <TextSemiBold style={{ fontSize: 15, color: 'white' }}>Start selling</TextSemiBold>
            </FancyButton> */}
        </View>
    );
};
export default memo(SupportArtist);

const CardSlider = () => {
    const transArr = useSharedValue([0, (-CARD_WIDTH * 2) / 3, (-CARD_WIDTH * 2) / 3, (-CARD_WIDTH * 2) / 3]);
    const [curIndex, setCurIndex] = useState(3);

    const animStyle = (index: number) =>
        useAnimatedStyle(() => ({
            transform: [{ translateX: transArr.value[index] }],
        }));

    const moveCard = (index: number) => () => {
        if (index > 0) {
            var curArr = [...transArr.value];
            var newArr = curArr.map((pos, i) => {
                if (i == 0) return 0;
                if (i <= index) return (-CARD_WIDTH * 2) / 3;
                return 0;
            });

            transArr.value = withTiming(newArr, { duration: 300 });
        } else transArr.value = withTiming([0, 0, 0, 0], { duration: 300 });
    };

    const swipeLeft = Gesture.Fling()
        .runOnJS(true)
        .direction(Directions.LEFT)
        .onStart(e => {
            var newIndex = Math.min(3, curIndex + 1);

            setCurIndex(newIndex);
            moveCard(newIndex)();
        });

    const swipeRight = Gesture.Fling()
        .runOnJS(true)
        .direction(Directions.RIGHT)
        .onStart(e => {
            var newIndex = Math.max(0, curIndex - 1);
            setCurIndex(newIndex);
            moveCard(newIndex)();
        });

    const swipeAll = () => {
        setCurIndex(0);
        transArr.value = withTiming([0, 0, 0, 0], { duration: 300 });
    };

    useEffect(() => {
        EventEmitter.addListener(EVENT_NAME, swipeAll);
        return () => {
            EventEmitter.removeListener(EVENT_NAME, swipeAll);
        };
    }, []);

    return (
        <GestureDetector gesture={Gesture.Race(swipeLeft, swipeRight)}>
            <View style={styles.slider}>
                <AnimPressable style={[styles.card, animStyle(0)]} onPress={moveCard(0)}>
                    <Image style={{ width: '100%', height: '100%' }} source={require('@image/design-seller0.png')} />
                </AnimPressable>
                <AnimPressable style={[styles.card, animStyle(1)]} onPress={moveCard(1)}>
                    <Image style={{ width: '100%', height: '100%' }} source={require('@image/design-seller1.png')} />
                </AnimPressable>
                <AnimPressable
                    onPress={moveCard(2)}
                    style={[styles.card, { marginLeft: (-CARD_WIDTH / 3) * 2 }, animStyle(2)]}
                >
                    <Image style={{ width: '100%', height: '100%' }} source={require('@image/design-seller2.png')} />
                </AnimPressable>
                <AnimPressable
                    onPress={moveCard(3)}
                    style={[styles.card, { marginLeft: (-CARD_WIDTH / 3) * 2 }, animStyle(3)]}
                >
                    <Image style={{ width: '100%', height: '100%' }} source={require('@image/design-seller3.png')} />
                </AnimPressable>
            </View>
        </GestureDetector>
    );
};

/**
 * Export cho màn Home sử dụng
 *
 * Swipe toàn bộ card sang bên phải khi scroll đến mục này
 */
export const swipeCardToRight = () => {
    EventEmitter.dispatch(EVENT_NAME);
};

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
        width: '100%',
        paddingHorizontal: 16,
    },
    slider: {
        width: SCREEN_WIDTH - 32,
        aspectRatio: 2,
        marginTop: 14,
        borderRadius: 5,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    card: { width: CARD_WIDTH, aspectRatio: 1, borderRadius: 5, overflow: 'hidden' },
    button: {
        width: '100%',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 18,
        backgroundColor: lightColor.primary,
    },
});
