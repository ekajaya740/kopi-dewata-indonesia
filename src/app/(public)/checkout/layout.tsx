'use client';

import QueryClientPage from '@/components/QueryClientPage';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <QueryClientPage>{children}</QueryClientPage>;
}
