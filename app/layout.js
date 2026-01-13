import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata = {
  title: 'PanchaGavya Store - Authentic Organic Products',
  description: 'Your trusted source for authentic Panchagavya-based organic products. Agriculture, Personal Care, Wellness, and Spiritual items.',
  keywords: 'panchagavya, organic, natural, ayurveda, agriculture, wellness, cow products',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <CartProvider>
          <Header />
          <main style={{ minHeight: 'calc(100vh - 200px)' }}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
