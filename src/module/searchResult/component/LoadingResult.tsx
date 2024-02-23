import React, { memo } from 'react';
import { View } from 'react-native';
import { SCREEN_WIDTH } from '@util/index';

const CARD_WIDTH = (SCREEN_WIDTH - 44) / 2;
const LoadingResult = ({ hideChild = false }) => {
    return <View style={{ flex: 1, backgroundColor: 'white' }}></View>;
};

export default memo(LoadingResult);
