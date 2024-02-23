import React, { memo } from 'react';

import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SCREEN_WIDTH } from '@util/index';

const CARD_WIDTH = (SCREEN_WIDTH - 44) / 2;
const LoadingMore = () => {
    return (
        <View
            style={{
                width: SCREEN_WIDTH,
                height: 100,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ActivityIndicator size={'small'} color={'#2792ce'} />
        </View>
    );
};

export default memo(LoadingMore);
