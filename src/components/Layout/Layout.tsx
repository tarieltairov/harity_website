import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { BreadCrumbs } from '@components/BreadCrumbs';
import { Loader } from '@ui/Loader';

export function Layout() {
  return (
    <>
      <Header />
      <BreadCrumbs />
      <main>
        {/* Пока ленивая страница грузится, шапка и подвал остаются на месте */}
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
