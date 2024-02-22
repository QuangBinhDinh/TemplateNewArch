import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery, APP_USER_AGENT } from '@api/base';

const API_URL = 'https://api.printerval.com';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({
        baseUrl: API_URL,
        timeout: 50000,
        headers: {
            'User-Agent': APP_USER_AGENT,
        },
    }),
    endpoints: build => ({
        // fetchSlug: build.query<{ result: Slug[] }, string>({
        //     query: keyword => ({ url: `slug_manager?filters=slug=${keyword}` }),
        // }),
        fetchCategorySlug: build.query<{ id: number; name: string }, string>({
            query: categorySlug => ({ url: `category?filters=slug=${categorySlug}&metric=first&fields=id,name` }),
            transformResponse: res => res.result,
        }),

        fetchPaymentConfig: build.query<{ stripe: any; paypal: any; sa: any }, void>({
            query: () => ({ url: `payment-info?token=megaads@123456` }),
            transformResponse: res => res.result,
        }),
        // fetchCountries: build.query<Country[], void>({
        //     query: () => ({ url: `country?page_size=-1&embeds=provinces` }),
        //     transformResponse: res => res.result,
        // }),
    }),
    tagTypes: ['Cart', 'CartCheckout', 'ProductResult'],
});
