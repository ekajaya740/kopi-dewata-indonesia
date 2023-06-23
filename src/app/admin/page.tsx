import { redirect } from 'next/navigation';
import Loading from './loading';

export default async function Page() {
  redirect('/admin/dashboard');
  return (
    <>
      <Loading />
    </>
  );
}
