import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Navbar from './Navbar';

function Layout({ toggleTheme, isDark }) {
  return (
    <div
      className={`
      flex flex-col min-h-screen font-sans transition-colors duration-500 relative
      bg-gradient-to-br from-white via-primary-light to-orange-200
      dark:from-dark-bg dark:via-dark-bg dark:to-[#2c2420]
    `}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern bg-grid-sm opacity-[0.05] dark:opacity-[0.03]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80 dark:to-dark-bg/90"></div>
      </div>
      <div className="relative z-50">
        <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      </div>
      <main className="flex-grow w-full relative z-10 pt-24">
        <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-multiply dark:hidden"></div>
        <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none hidden dark:block"></div>
        <Outlet />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
export default Layout;
