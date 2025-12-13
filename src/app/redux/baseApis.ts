import { url } from '@/utils/imageHandler';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import Cookies from 'js-cookie';
const baseApis = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: url,
        headers: {
            Authorization: `${Cookies.get('accessTokenForPlayFinder')}`,
        },
    }),
    tagTypes: ['event', 'category', 'profile', 'termsAndConditions', 'privacyPolicy', 'faq', 'rating'],
    endpoints: () => ({}),
});

export default baseApis;
