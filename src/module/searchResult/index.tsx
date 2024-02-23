import HeaderScreen from '@components/HeaderScreen';
import { SearchResultRouteProp } from '@navigation/navigationRoute';
import { useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { ProductFilterArgs, useFetchProductSearchQuery } from './service';
import LoadingResult from './component/LoadingResult';
import ProductList from './component/ProductList';
import { ERROR_CODE } from '@api/constant';

const SearchResult = () => {
    const {
        params: { keyword, title, tag_id, categoryId, lowest_child, ...rest },
    } = useRoute<SearchResultRouteProp>();

    const [searchFilter, setFilter] = useState<Partial<ProductFilterArgs>>({
        q: keyword,
        tag_id,
        ...rest,
    });
    //nest destructing with possible undefined value
    const {
        data: { products, filterOptions, priceRange, categories, meta } = {},
        error,
        isFetching,
        refetch,
    } = useFetchProductSearchQuery(searchFilter);

    const loadMore = useCallback(() => {
        if (meta?.has_next) {
            setFilter(prev => ({ ...prev, page_id: meta?.page_id ? Number(meta.page_id) + 1 : 1 }));
        }
    }, [meta]);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <HeaderScreen title={title} />
            <View style={{ flex: 1 }}>
                {isFetching && !searchFilter.page_id ? (
                    <LoadingResult hideChild />
                ) : error?.code == ERROR_CODE.NO_NETWORK ? (
                    <></>
                ) : error?.code == ERROR_CODE.TIME_OUT ? (
                    <></>
                ) : (
                    <ProductList
                        data={products}
                        meta={meta}
                        sub={categories}
                        loadMore={loadMore}
                        filter={filterOptions}
                        priceRange={priceRange}
                        currentFilter={searchFilter}
                        setFilter={setFilter}
                        refetch={refetch}
                    />
                )}
            </View>
        </View>
    );
};

export default SearchResult;
