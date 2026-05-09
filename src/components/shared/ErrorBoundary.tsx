import { Component, type ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg border-2 border-red-500/30 p-8 text-center shadow-2xl">
          <p className="text-red-400 font-bold tracking-wide mb-2">SECTION UNAVAILABLE</p>
          <p className="text-gray-400 text-sm">An unexpected error occurred. Try switching tabs.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
