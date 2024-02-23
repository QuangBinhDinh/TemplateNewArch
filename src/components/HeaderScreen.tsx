import { goBack } from '@navigation/service';
import { lightColor } from '@styles/color';
import { shadow } from '@styles/shadow';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@rneui/base';
import { TextNormal } from './text';
import { SCREEN_WIDTH } from '@util/index';

interface IProps {
    title: string;

    /**
     * Override hàm onBack default
     */
    onBack?: any;

    /**
     * Hide mũi tên quay lại , dùng để ngăn user quay lại màn trước
     */
    disableBack?: boolean;
}

const HeaderScreen = ({ title, onBack, disableBack }: IProps) => {
    const insets = useSafeAreaInsets();
    const back = () => {
        if (!disableBack) {
            if (onBack) onBack();
            else goBack();
        }
    };
    return (
        <View style={[styles.container, shadow, { height: 46 + insets.top / 1.25, paddingTop: insets.top / 1.25 }]}>
            <Pressable style={styles.iconBack} hitSlop={15} onPress={back}>
                {!disableBack && <Icon type="antdesign" name="arrowleft" size={22} color={lightColor.secondary} />}
            </Pressable>
            <TextNormal
                style={{ fontSize: 16, color: lightColor.primaryBold, marginTop: 3, width: '80%' }}
                numberOfLines={1}
            >
                {title}
            </TextNormal>
        </View>
    );
};

export default memo(HeaderScreen);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        backgroundColor: 'white',
        zIndex: 600,
        //borderWidth: 1,
    },
    iconBack: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
});
