import '../globals.css';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import BottomNavbar from '@/components/BottomNavbar';

// TODO: change font
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <header className='sticky top-0 lg:hidden block'>
          <Navbar />
        </header>
        <div className='flex'>
          <Sidebar />
          <div className='p-8 w-full'>{children}</div>
        </div>
        <footer className='sticky bottom-0 lg:hidden block'>
          <BottomNavbar />
        </footer>
      </body>
    </html>
  );
}
