import { lazy, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { BreadCrumbs } from '@components/BreadCrumbs';
import { ErrorBoundary } from '@components/ErrorBoundary';
import { Loader } from '@ui/Loader';

const ServerError = lazy(() =>
  import('@pages/ServerError').then((m) => ({ default: m.ServerError }))
);

export function Layout() {
  const location = useLocation();

  return (
    <>
      <Header />
      <BreadCrumbs />
      <main>
        {/* Пока ленивая страница грузится, шапка и подвал остаются на месте */}
        <Suspense fallback={<Loader />}>
          {/* key по пути: при переходе на другую страницу состояние ошибки
              сбрасывается и пользователь не остаётся запертым на экране 500 */}
          <ErrorBoundary key={location.pathname} fallback={<ServerError />}>
            <Outlet />
          </ErrorBoundary>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
