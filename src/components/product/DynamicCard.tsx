import { TextSemiBold, TextNormal } from '@components/text';
import { lightColor } from '@styles/color';
import { Product } from '@type/common';
import React, { memo, useMemo, useState } from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle, Image } from 'react-native';
import he from 'he';
import StarRating from '@components/StarRating';

import { navigate } from '@navigation/service';
import { cdnImageV2 } from '@util/cdnV2';
import { capitalize } from 'lodash';
import { useAppSelector } from '@store/hook';

import { formatPrice } from '@util/index';
import { APP_USER_AGENT } from '@api/base';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/store';
import { useSelector } from 'react-redux';

interface IProps {
    item: Product;
    style?: StyleProp<ViewStyle>;

    isShowSeller?: boolean;
    canAddWishlist?: boolean;
}

const DynamicCard = ({ item, style, isShowSeller = true, canAddWishlist = true }: IProps) => {
    const sku_id = item.variant_default?.id || -1;

    const discountText = useMemo(() => {
        var percent = '';
        var amount = Number(item.high_price) - Number(item.price);
        if (amount > 0) {
            percent = `-${Math.round((amount / Number(item.high_price)) * 100)}%`;
        }
        return percent;
    }, [item]);

    const toDetail = () => {
        //console.log(item);
        navigate('DetailProduct', { productId: item.id, productName: item.name }, item.id);
    };

    const toSeller = async () => {
        navigate('SellerPage', { seller: item.user });
    };

    return (
        <Pressable style={[styles.container, style]} onPress={toDetail}>
            {!!discountText && (
                <View style={styles.discount}>
                    <TextNormal style={{ fontSize: 12, color: 'white', lineHeight: 16 }}>{discountText}</TextNormal>
                </View>
            )}

            <Image
                style={styles.image}
                source={{
                    uri: cdnImageV2(item.image_url),
                    headers: {
                        'User-Agent': APP_USER_AGENT,
                    },
                    cache: 'force-cache',
                }}
                resizeMode="cover"
            />
            {item.rating_value > 0 && (
                <View style={styles.rating}>
                    <StarRating rating={item.rating_value} width={80} />
                    {!!item.rating_count && (
                        <TextNormal style={styles.ratingText}>{`(${item.rating_count})`}</TextNormal>
                    )}
                </View>
            )}
            <TextSemiBold style={styles.title} numberOfLines={2}>
                {capitalize(he.decode(item.name))}
            </TextSemiBold>
            {isShowSeller && !!item.user?.name && (
                <Pressable onPress={toSeller}>
                    <TextNormal numberOfLines={1} style={styles.subTitle}>
                        {capitalize(item.user.name.trim())}
                    </TextNormal>
                </Pressable>
            )}
            <TextSemiBold style={styles.price}>
                {formatPrice(item.price)}{' '}
                {item.high_price > item.price && (
                    <TextNormal style={styles.oldPrice}>{formatPrice(item.high_price)}</TextNormal>
                )}
            </TextSemiBold>
        </Pressable>
    );
};

export default memo(DynamicCard);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 24,
        //borderWidth: 1,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        marginBottom: 14,
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: lightColor.graybg,
    },
    rating: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    ratingText: { color: lightColor.grayout, marginLeft: 5, fontSize: 12, lineHeight: 14, marginTop: 2 },
    title: {
        fontSize: 14,
        lineHeight: 18,
        width: '100%',
    },
    subTitle: {
        fontSize: 12,
        color: lightColor.grayout,
        marginTop: 3,
        lineHeight: 16,
    },
    price: {
        color: lightColor.price,
        fontSize: 18,
    },
    oldPrice: { fontSize: 14, color: lightColor.grayout, textDecorationLine: 'line-through' },
    discount: {
        width: 48,
        height: 26,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: lightColor.price,
        position: 'absolute',
        zIndex: 100,
        top: 7,
        left: 6,
    },
    favButton: {
        width: 30,
        height: 30,
        borderWidth: 1.5,
        borderColor: lightColor.price,
        backgroundColor: '#fff',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 100,
        top: 2,
        right: 3,
    },
});
