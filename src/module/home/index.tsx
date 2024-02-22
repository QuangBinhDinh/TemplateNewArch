import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PrintervalLogo } from '@assets/svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MainCategory from './components/MainCategory';
import ExploreProd from './components/ExploreProd';
import axios from 'axios';

const HomeScreen = () => {
    const insets = useSafeAreaInsets();

    // useEffect(() => {
    //     const fetchTest = async () => {
    //         try {
    //             var res = await axios.get('https://printerval.com/product/recommendation?token');
    //             console.log('Data', res.data);
    //         } catch (e) {
    //             console.log('Error', e);
    //         }
    //     };

    //     fetchTest();
    // }, []);
    return (
        <View style={[styles.container, { paddingTop: 10 + insets.top / 1.25 }]}>
            <View style={{ width: '100%', paddingBottom: 10 }}>
                <PrintervalLogo width={144} height={36} style={{ marginLeft: 20 }} />
            </View>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} removeClippedSubviews>
                <ExploreProd />
            </ScrollView>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
