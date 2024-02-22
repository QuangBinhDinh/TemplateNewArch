import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextSemiBold } from '@components/text';
import { splitColArray } from '@util/index';
import DynamicCard from '@components/product/DynamicCard';
import { useFetchExploreProdQuery } from '../service';

const ExploreProd = () => {
    const { data: { result } = {} } = useFetchExploreProdQuery('123456-xxx-123456');

    const newData = result ? splitColArray(result) : null;

    if (!newData) return null;
    return (
        <View style={styles.container}>
            <TextSemiBold style={{ fontSize: 20, marginLeft: 16, lineHeight: 26 }}>
                Explore products picked for you
            </TextSemiBold>
            <View style={styles.list}>
                {newData.map((col, index) => (
                    <View key={index} style={[{ width: '48%' }]}>
                        {col.map((item, i) => (
                            <DynamicCard
                                item={item}
                                key={item.id}
                                style={{ marginTop: i == 0 ? 16 : 24 }}
                                canAddWishlist={false}
                            />
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
};

export default memo(ExploreProd);

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
        width: '100%',
    },
    list: { width: '100%', flexDirection: 'row', paddingHorizontal: 16, justifyContent: 'space-between' },
});
