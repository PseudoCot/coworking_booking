import { PropsWithChildren, } from 'react';
import Header from './header';
import Footer from './footer';

type LayoutProps = PropsWithChildren;

export default function Layout({ children }: LayoutProps): JSX.Element {

  return (
    <div className='container'>
      <Header />

      <main className="main">
        {children}
      </main>

      <Footer />
    </div>
  );
}
