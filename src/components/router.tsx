import { createBrowserRouter } from 'react-router-dom';
import SearchApp from '../App';

import { ErrorPage } from '../components/ErrorPage';

import { Result } from './result';

export const ROUTE = '/results/:name/:date';

export const ROUTING = [
  {
    children: [
      {
        path: 'results/:name/:date',
        element: <Result names={[]} date={[]} />,
        errorElement: <ErrorPage />,
      },
    ],
    path: '/',
    element: <SearchApp />,
    errorElement: <ErrorPage />,
  },
];
export const router = createBrowserRouter(ROUTING);
