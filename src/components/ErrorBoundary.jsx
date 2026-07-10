import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container" style={{ padding: '120px 0', textAlign: 'center' }}>
          <h1>Something went wrong</h1>
          <p style={{ color: 'var(--text2)', margin: '12px 0 24px' }}>An unexpected error occurred. Please try refreshing the page.</p>
          <button className="button primary" onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}
