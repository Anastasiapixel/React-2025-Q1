import ReactDOM from 'react-dom/client';
import SearchApp from './App';
import './index.css';
import { Component, ReactNode } from 'react';

const rootElement = document.getElementById('root');

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state: { hasError: boolean; errorMessage?: string } = { hasError: false };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
    console.log(error);
  }
  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error(error, info);
  }
  logErrorToMyService: (error: Error, errorInfo: Error) => void = () => {};

  resetError = () => {
    this.setState({ hasError: false, errorMessage: undefined });
  };
  render() {
    if (this.state.hasError) {
      return (
        <div className="error">
          <p>{this.state.errorMessage}</p>
          <button onClick={this.resetError}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <SearchApp />
      </ErrorBoundary>
    </>
  );
}
