'use client';

import QueryClientPage from '@/components/QueryClientPage';

export default function Layout({ children }: { children: React.ReactNode }) {
  // return <div>{children}</div>;
  return <QueryClientPage>{children}</QueryClientPage>;
}
