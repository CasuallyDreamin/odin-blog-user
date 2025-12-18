'use client';

import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SettingsProvider from './context/SettingsProvider';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <SettingsProvider>
      <html lang="en">
        <body className="antialiased flex flex-col min-h-screen">
          <Navbar />

          <motion.div
            key={typeof children === 'object' ? children.key : children}
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
    </SettingsProvider>
  );
}
