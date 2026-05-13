import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex min-h-screen max-w-2xl items-center px-4">
          <div className="panel w-full p-8 text-center">
            <h1 className="text-2xl font-semibold text-white">Something broke.</h1>
            <p className="mt-3 text-slate-400">Refresh the page or retry the audit flow.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
