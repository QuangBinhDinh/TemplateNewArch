import { TextNormal } from '@components/text';
import { lightColor } from '@styles/color';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { navigate } from '@navigation/service';
import { cdnImageV2 } from '@util/cdnV2';
import ImageLoader from '@components/ImageLoader';

const SubCategory = ({ data }: { data: any }) => {
    const renderItem = ({ item }: { item: any }) => <SubItem item={item} />;

    if (!data || data.length == 0) return null;
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={data}
                contentContainerStyle={{ paddingLeft: 4, paddingRight: 16 }}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                horizontal
            />
        </View>
    );
};

const SubItem = memo(({ item }: { item: any }) => {
    const toSubCategory = () => {
        console.log(item);
        //dispatch(api.util.invalidateTags(['ProductResult']));
        navigate('ProductCategory', { title: item.name, categoryId: item.id, lowest_child: true }, item.id);
    };
    return (
        <Pressable style={styles.item} hitSlop={5} onPress={toSubCategory}>
            <ImageLoader style={styles.image} uri={cdnImageV2(item.image_url, 250, 250)} />
            <TextNormal style={styles.itemTitle} numberOfLines={2}>
                {item.name}
            </TextNormal>
        </Pressable>
    );
});

export default memo(SubCategory);

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        width: '100%',
    },
    list: {
        width: '100%',
        height: 150,
        // borderWidth: 1,
    },
    item: { height: 150, width: 100, marginLeft: 12, alignItems: 'center' },
    image: { width: 100, height: 100, borderRadius: 50, backgroundColor: lightColor.graybg },
    itemTitle: { fontSize: 14, marginTop: 10, width: '100%', textAlign: 'center', lineHeight: 18 },
});
