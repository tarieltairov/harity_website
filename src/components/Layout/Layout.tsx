import { Outlet } from 'react-router-dom';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { BreadCrumbs } from '@components/BreadCrumbs';

export function Layout() {
  return (
    <>
      <Header />
      <BreadCrumbs />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
