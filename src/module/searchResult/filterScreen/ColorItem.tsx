import { Icon } from '@rneui/base';
import { SCREEN_WIDTH } from '@util/index';
import React, { memo } from 'react';
import { Image, ImageBackground, Pressable, StyleSheet, View } from 'react-native';

import { cdnImageV2 } from '@util/cdnV2';

interface IProps {
    color_id: number | undefined;

    item: {
        id: number;
        name: string;
        text: string;
        color_code: string;
        slug: string;
        image_url: string;
    };

    setColor: (x: any) => void;
    index: number;
}
const ColorItem = ({ color_id, item, setColor, index }: IProps) => {
    const selected = color_id == item.id;

    const lastOfRow = index % 8 == 7;
    if (item.color_code == '#ffffff')
        return (
            <Pressable
                style={[styles.whiteContainer, lastOfRow && { marginRight: 0 }]}
                onPress={() => setColor(item.id)}
            >
                {selected && (
                    <View style={[styles.innerView, { backgroundColor: 'black' }]}>
                        <View style={[styles.innerView, { backgroundColor: item.color_code }]}>
                            <Icon type="feather" size={26} color={'black'} name="check" />
                        </View>
                    </View>
                )}
            </Pressable>
        );

    if (!!item.color_code)
        return (
            <Pressable
                style={[styles.container, { backgroundColor: item.color_code }, lastOfRow && { marginRight: 0 }]}
                onPress={() => setColor(item.id)}
            >
                {selected && (
                    <View style={[styles.innerView, { backgroundColor: 'white' }]}>
                        <View style={[styles.innerView, { backgroundColor: item.color_code }]}>
                            <Icon type="feather" size={26} color={'white'} name="check" />
                        </View>
                    </View>
                )}
            </Pressable>
        );

    return (
        <Pressable
            style={[styles.container, { borderWidth: 0.2 }, lastOfRow && { marginRight: 0 }]}
            onPress={() => setColor(item.id)}
        >
            <ImageBackground style={styles.imgColor} source={{ uri: cdnImageV2(item.image_url, 100, 100) }}>
                {selected && (
                    <View style={[styles.innerView, { backgroundColor: 'white' }]}>
                        <ImageBackground
                            style={[styles.imgColor, { width: '86%', height: '86%' }]}
                            source={{ uri: cdnImageV2(item.image_url, 100, 100) }}
                        >
                            <Icon type="feather" size={26} color={'white'} name="check" />
                        </ImageBackground>
                    </View>
                )}
            </ImageBackground>
        </Pressable>
    );
};

export default memo(ColorItem);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (SCREEN_WIDTH - 90) / 8,
        height: (SCREEN_WIDTH - 90) / 8,
        overflow: 'hidden',
        borderRadius: 60,
        marginRight: 8,
        marginTop: 8,
        borderWidth: 0,
    },
    whiteContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (SCREEN_WIDTH - 90) / 8,
        height: (SCREEN_WIDTH - 90) / 8,
        overflow: 'hidden',
        borderRadius: 60,
        marginRight: 8,
        borderWidth: 1,
        marginTop: 8,
        backgroundColor: 'white',
        borderColor: '#dcdcdc',
    },
    innerView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: '90%',
        borderRadius: 60,
        backgroundColor: 'white',
    },
    imgColor: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
    },
});
