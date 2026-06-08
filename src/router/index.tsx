import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import { singleCountryLoader } from '@/router/singleCountryLoader';

import Layout from '@/components/Layout';
import CountriesPage from '@/pages/CountriesPage';

const SingleCountryPage = lazy(() => import('@/pages/SingleCountryPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <CountriesPage />,
            },
            {
                path: '/:countryName',
                element: <SingleCountryPage />,
                errorElement: <NotFoundPage />,
                loader: singleCountryLoader,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
]);