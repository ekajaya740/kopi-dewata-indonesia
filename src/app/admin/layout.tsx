import '../globals.css';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
        <div className='flex'>
          <Sidebar />
          <div className='p-8 w-full'>{children}</div>
        </div>
      </body>
    </html>
  );
}
