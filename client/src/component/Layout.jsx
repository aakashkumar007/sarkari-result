import React from 'react';
import Header from '../pages/header/Header';
import Footer from '../pages/footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;