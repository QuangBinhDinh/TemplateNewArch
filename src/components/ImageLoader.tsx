import React, { memo } from 'react';
import { Image, StyleSheet, StyleProp, ImageStyle } from 'react-native';

interface IProps {
    uri: string;
    style: StyleProp<ImageStyle>;
}

const ImageLoader = ({ uri, style }: IProps) => {
    return <Image source={{ uri, cache: 'force-cache' }} style={[styles.container, style]} resizeMode="cover" />;
};

export default memo(ImageLoader);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
    },
});
