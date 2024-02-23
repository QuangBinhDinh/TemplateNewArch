import { api, domainApi } from '@api/service';
import { defaultSerializeQueryArgs } from '@reduxjs/toolkit/query';
import qs from 'query-string';
import { isEqual } from 'lodash';
import { CACHE_TIME_SECONDS } from '@constant/index';

export interface ProductFilterArgs {
    id: string | number;
    category_id: string | number;
    category_slug: string;
    q: string;
    tag_id: number;
    page_size: number;
    page_id: number;
    minPrice: string | number;
    maxPrice: string | number;
    order: string;
    color_variant_id: number;
    size_variant_id: number;
    type_variant_id: number;
    user_id: number;
    event_id: number;
}

const extendedApi = api.injectEndpoints({
    endpoints: build => ({}),
});

const extendedDomain = domainApi.injectEndpoints({
    endpoints: build => ({
        fetchProductResult: build.query<any, Partial<ProductFilterArgs>>({
            keepUnusedDataFor: CACHE_TIME_SECONDS,
            query: args => {
                var newArgs = Object.assign({ page_size: 40, page_type: 'category' }, args);
                return { url: 'mobile/product/category-filter', method: 'get', params: newArgs };
            },
            serializeQueryArgs: ({ queryArgs, endpointName, endpointDefinition }) => {
                const {
                    id,
                    minPrice,
                    maxPrice,
                    order,
                    color_variant_id,
                    size_variant_id,
                    type_variant_id,
                    user_id,
                    event_id,
                } = queryArgs;
                return `fetchProductResult?${qs.stringify({
                    id,
                    minPrice,
                    maxPrice,
                    order,
                    color_variant_id,
                    size_variant_id,
                    type_variant_id,
                    user_id,
                    event_id,
                })}`;
            },
            merge: (curCache, newData, { arg }) => {
                // chỉ merge data trả về khi load more (page_id >=1)
                if (newData.result?.length > 0 && !!arg.page_id && arg.page_id >= 1) {
                    var merged = curCache.result.concat(newData.result);
                    curCache.result = merged;
                    curCache.meta = newData.meta;
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return !isEqual(currentArg, previousArg);
            },
            providesTags: ['ProductResult'],
        }),
        fetchProductSearch: build.query<any, Partial<ProductFilterArgs>>({
            keepUnusedDataFor: CACHE_TIME_SECONDS,
            query: args => {
                var newArgs = Object.assign({ page_size: 40 }, args);
                return { url: 'search/api', method: 'get', params: newArgs };
            },
            serializeQueryArgs: ({ queryArgs, endpointName, endpointDefinition }) => {
                const { tag_id, q, minPrice, maxPrice, order, color_variant_id, size_variant_id, type_variant_id } =
                    queryArgs;
                return `fetchProductSearch?${qs.stringify({
                    q,
                    tag_id,
                    minPrice,
                    maxPrice,
                    order,
                    color_variant_id,
                    size_variant_id,
                    type_variant_id,
                })}`;
            },
            merge: (curCache, newData, { arg }) => {
                // chỉ merge data trả về khi load more (page_id >=1)
                if (newData.products?.length > 0 && !!arg.page_id && arg.page_id >= 1) {
                    var merged = curCache.products.concat(newData.products);
                    curCache.products = merged;
                    curCache.meta = newData.meta;
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return !isEqual(currentArg, previousArg);
            },
            transformResponse: response => {
                //chuẩn hoá data giống như api lấy product theo category ở trên
                var allFilter = response.result?.allFilters;
                var typeList = allFilter?.find((i: any) => i.type == 'Type')?.filters;
                var colorList = allFilter?.find((i: any) => i.type == 'Color')?.filters;
                var sizeList = allFilter?.find((i: any) => i.type == 'Size')?.filters;

                var filterOptions = {
                    Type: typeList,
                    Color: colorList,
                    Size: sizeList,
                };
                return { ...response.result, meta: response.meta, filterOptions };
            },
            providesTags: ['SearchResult'],
        }),
    }),
});

export const { useFetchProductSearchQuery, useFetchProductResultQuery } = extendedDomain;
