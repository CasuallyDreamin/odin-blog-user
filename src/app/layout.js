'use client';

import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Navbar />

        {/* Animate children on route change */}
        <motion.div
          key={typeof children === 'object' ? children.key : children} // ensures new animation on new child
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="flex-1"
        >
          {children}
        </motion.div>

        <Footer />
      </body>
    </html>
  );
}
