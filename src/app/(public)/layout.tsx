import Navbar from '@/components/Navbar';
import '../globals.css';
import { Inter } from 'next/font/google';
import QueryClientPage from '@/components/QueryClientPage';

// TODO: change font
const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <header className='sticky top-0 z-[9999]'>
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
