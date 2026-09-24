import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Что показать вместо упавшего поддерева — обычно страница ServerError */
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Ловит ошибки рендера дочерних компонентов (в том числе сбой загрузки
// ленивого чанка страницы) и показывает fallback вместо белого экрана.
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Сбора ошибок пока нет — до появления бэкенда пишем в консоль
    console.error('Ошибка рендера:', error, errorInfo);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
