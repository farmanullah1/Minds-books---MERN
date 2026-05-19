import React, { Component, ErrorInfo, ReactNode } from 'react';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public handleRefresh = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-card glass-panel">
            <div className="error-icon-wrapper">
              <FiAlertTriangle size={48} className="error-icon pulse-warning" />
            </div>
            <h2>Oops! Something went wrong.</h2>
            <p className="error-message">
              We encountered an unexpected error while rendering this view.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <div className="error-details">
                <code>{this.state.error.toString()}</code>
              </div>
            )}
            <button className="error-refresh-btn" onClick={this.handleRefresh}>
              <FiRefreshCw />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
