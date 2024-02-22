import { api, domainApi, globalApi } from '@api/service';
import { Post, ResponseMeta } from '@type/common';

export interface ExploreTag {
    image_url: string;
    tag_name: string;
    url: string;
}

export interface Design {
    id: number;
    tag_id: number;
    title: string;
    slug: string;
    designs: { image_url: string; background_color: string }[];
}
const extendedApi = api.injectEndpoints({
    endpoints: build => ({
        fetchHomeBanner: build.query<any, void>({
            query: () => ({ url: 'option?filters=key=slide' }),
            transformResponse: res => {
                let banner: any[] = [];
                var obj = res.result[0];
                if (obj) {
                    banner = JSON.parse(obj.value).slides;
                }
                return banner;
            },
        }),

        fetchExploreTrend: build.query<ExploreTag[], void>({
            query: () => ({ url: 'option?filters=key=home_tags' }),
            transformResponse: res => {
                let banner: any[] = [];
                var obj = res.result[0];

                if (obj) {
                    banner = JSON.parse(obj.value);
                }
                return banner;
            },
        }),

        fetchPopularDesign: build.query<Design[], void>({
            query: () => ({ url: 'option?filters=key=design-box-popular-tags-data' }),
            transformResponse: res => JSON.parse(res.result[0]?.value),
        }),
        fetchCategoryBanner: build.query<any, void>({
            query: () => ({ url: 'category/home-banner?limit=6' }),
        }),
        fetchSeller: build.query<any, { slug: string }>({
            query: args => ({ url: `user?filters=slug=${args.slug}&metric=first` }),
        }),
    }),
});

const extendedDomain = domainApi.injectEndpoints({
    endpoints: build => ({
        fetchExploreProd: build.query<any, string>({
            query: token => ({ url: `product/recommendation?token=${token}` }),
        }),

        //api bị lỗi , cần fix lại
        browsingHistory: build.mutation<any, { product_id: number; token: string }>({
            query: body => ({
                url: 'browsing-history/asyn-get-history?ignore_localization=1',
                method: 'post',
                body: { url: 'https://printerval.com/', ...body },
            }),
        }),

        fetchDetailLandingPage: build.query<any, { slug: string }>({
            query: args => {
                return { url: `page/api/get-detail-by-slug?slug=${args.slug}` };
            },
            transformResponse: response => {
                const image = response.data.config_value.filter((i: any) => i.type === 'banner')[0].data.images[0];
                const listItems = response.data.config_value.filter((i: any) => i.type !== 'banner');
                return { image, listItems };
            },
        }),

        addItemToWishList: build.query<any, { productId: string; productSkuId: string; configurations: string }>({
            query: args => ({ url: 'add-to-wishlist', method: 'post', body: args }),
        }),
    }),
});

const globalDomain = globalApi.injectEndpoints({
    endpoints: build => ({
        fetchPrintervalPost: build.query<{ meta: ResponseMeta; result: Post[] }, void>({
            query: () => ({ url: 'post?embeds=category' }),
        }),
        fetchPostById: build.query<{ meta: ResponseMeta; result: Post[] }, number>({
            query: id => ({ url: `post?filters=id=${id}` }),
        }),
    }),
});

export const {
    useFetchHomeBannerQuery,
    useFetchExploreTrendQuery,
    useFetchPopularDesignQuery,
    useFetchCategoryBannerQuery,
    useLazyFetchSellerQuery,
} = extendedApi;

export const {
    useFetchExploreProdQuery,
    useBrowsingHistoryMutation,
    useFetchDetailLandingPageQuery,
    useAddItemToWishListQuery,
} = extendedDomain;

export const { useLazyFetchPrintervalPostQuery, useLazyFetchPostByIdQuery } = globalDomain;
