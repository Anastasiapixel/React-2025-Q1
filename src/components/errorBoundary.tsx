import { Component, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: JSX.Element;
}

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = {
    errorMessage: '',
  };
  resetError = () => {
    history.go(0);
  };
  static getDerivedStateFromError(error: Error) {
    return { errorMessage: error.toString() };
  }

  componentDidCatch(error: Error) {
    console.log(error);
  }

  logErrorToMyService: (error: Error, errorInfo: ErrorInfo) => void = () => {};

  render() {
    if (this.state.errorMessage) {
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
export default ErrorBoundary;
