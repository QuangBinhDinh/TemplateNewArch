import { TextNormal, TextSemiBold } from '@components/text';
import React, { memo } from 'react';
import { Pressable } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import { ExploreTag, useFetchExploreTrendQuery } from '../service';
import { useAppDispatch } from '@store/hook';
import { lightColor } from '@styles/color';
import ImageLoader from '@components/ImageLoader';
import qs from 'query-string';
import { domainApi } from '@api/service';
import { navigate } from '@navigation/service';

const API_URL = 'https://api.printerval.com/';

const TrendExplore = () => {
    const { data } = useFetchExploreTrendQuery();

    const renderItem = ({ item }: { item: ExploreTag }) => <TrendItem item={item} />;

    if (!data) return null;
    return (
        <View style={styles.container}>
            <TextSemiBold style={{ fontSize: 20, marginLeft: 16, lineHeight: 26 }}>Explore by trends</TextSemiBold>
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

const TrendItem = ({ item }: { item: ExploreTag }) => {
    const { image_url, tag_name, url } = item;

    const dispatch = useAppDispatch();
    const onPress = async () => {
        const urlPattern = /^https:\/\/([^\/]+)\/search\?([^#]+)/;
        const pagePattern = /^https:\/\/([^\/]+)\/page\/(.*)/;
        const categoryPattern = /^https:\/\/([^\/]+)\/c\/(.*)/;
        const match = url.match(urlPattern);
        const matchPage = url.match(pagePattern);
        const matchCategory = url.match(categoryPattern);
        if (!!match) {
            const params = qs.parse(match[2]);
            if (params.q) {
                dispatch(domainApi.util.invalidateTags(['SearchResult']));
                navigate('SearchResult', { ...params, title: params.q });
            }
        } else if (matchPage) {
            // const slug: string = matchPage[2];
            // if (slug) {
            //     navigate('LandingPage', { title: tag_name, slug: slug });
            // }
        } else if (matchCategory) {
            const categorySlug = matchCategory[2].split('/').pop();
            const response = await fetch(`${API_URL}category?filters=slug=${categorySlug}&metric=first&fields=id,name`)
                .then(response => response.json())
                .catch(err => console.error(err));
            const category = response.result;
            navigate('ProductCategory', { title: category.name, categoryId: category.id }, category.id);
        }
    };

    return (
        <Pressable style={styles.item} onPress={onPress}>
            <ImageLoader style={styles.image} uri={image_url} />
            <TextNormal style={styles.itemTitle}>{tag_name}</TextNormal>
        </Pressable>
    );
};

export default memo(TrendExplore);

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
        width: '100%',
    },
    list: {
        marginTop: 16,
        width: '100%',
        height: 150,
        //borderWidth: 1,
    },
    item: { height: 150, width: 100, marginLeft: 12, alignItems: 'center' },
    image: { width: 100, height: 100, borderRadius: 50, backgroundColor: lightColor.graybg },
    itemTitle: { fontSize: 13.5, marginTop: 10, width: '100%', textAlign: 'center', lineHeight: 18 },
});
