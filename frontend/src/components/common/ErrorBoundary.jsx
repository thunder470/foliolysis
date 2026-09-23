import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('[foliolysis Application Error Boundary Caught]:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            minHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            backgroundColor: '#F8F9FB',
          }}
        >
          <div
            className="fintech-card"
            style={{
              maxWidth: '560px',
              width: '100%',
              padding: '36px',
              textAlign: 'center',
              boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.12)',
              borderRadius: '20px',
              border: '1px solid #E5E9EE',
              backgroundColor: '#FFFFFF',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: '#FEE2E2',
                color: '#EF4444',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <AlertTriangle size={30} />
            </div>

            <h2
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                color: '#1E2229',
                margin: '0 0 8px 0',
                letterSpacing: '-0.02em',
              }}
            >
              Application Encountered an Exception
            </h2>

            <p
              style={{
                fontSize: '0.86rem',
                color: '#5B6270',
                lineHeight: 1.5,
                margin: '0 0 24px 0',
              }}
            >
              {this.state.error?.message ||
                'An unexpected error occurred during execution. Your data is safe. You can reload this view or navigate back to the home screen.'}
            </p>

            {import.meta.env.DEV && this.state.errorInfo && (
              <details
                style={{
                  textAlign: 'left',
                  backgroundColor: '#F1F5F9',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontSize: '0.72rem',
                  fontFamily: 'monospace',
                  color: '#334155',
                  marginBottom: '24px',
                  overflowX: 'auto',
                }}
              >
                <summary style={{ cursor: 'pointer', fontWeight: 700, marginBottom: '6px' }}>
                  Stack Trace Details
                </summary>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                  {this.state.error?.stack}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <button
                type="button"
                onClick={this.handleReset}
                className="btn-primary"
                style={{
                  padding: '10px 20px',
                  fontSize: '0.85rem',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <RefreshCw size={15} />
                <span>Reload View</span>
              </button>

              <button
                type="button"
                onClick={() => (window.location.href = '/')}
                style={{
                  padding: '10px 20px',
                  fontSize: '0.85rem',
                  fontWeight: 650,
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#1E2229',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.18s ease',
                }}
              >
                <Home size={15} />
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
