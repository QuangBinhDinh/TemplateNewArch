import { TextNormal } from '@components/text';
import { shadowTop } from '@styles/shadow';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const insets = useSafeAreaInsets();
    return (
        <View>
            <View style={[styles.rowContainer, shadowTop]}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                            ? options.title
                            : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            key={index}
                            style={styles.button}
                            // accessibilityRole="button"
                            // accessibilityState={isFocused ? { selected: true } : {}}
                            // accessibilityLabel={options.tabBarAccessibilityLabel}

                            onPress={onPress}
                        >
                            {options.tabBarIcon({ focused: isFocused })}
                            <TextNormal style={[styles.label, { color: isFocused ? '#ff7300' : 'black' }]}>
                                {label}
                            </TextNormal>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <View style={{ width: SCREEN_WIDTH, height: insets.bottom / 2, backgroundColor: 'white' }} />
        </View>
    );
};

export default CustomTabBar;

const styles = StyleSheet.create({
    rowContainer: {
        width: SCREEN_WIDTH,
        height: 64,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    button: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    label: {
        fontSize: 12,
        lineHeight: 18,
        marginTop: 3,
    },

    cartOuter: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(255, 205, 169, 1)',
        borderRadius: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -28,

        overflow: 'hidden',
    },
});
