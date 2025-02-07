import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/errorBoundary';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './components/router';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </>
  );
}
