import { getProductStock } from '@/app/actions/getProductStock';
import { getSummaryTransactions } from '@/app/actions/getSummaryTransactions';
import SummaryCard from '@/components/SummaryCard';
import { AiOutlineTransaction } from 'react-icons/ai';
import { FaBoxOpen, FaBoxes } from 'react-icons/fa';

export default async function Page() {
  const transaksi = await getSummaryTransactions();
  const stok = await getProductStock();
  return (
    <>
      <h1 className='font-bold text-4xl pb-8'>Dashboard</h1>
      <div className='flex flex-wrap justify-center gap-4'>
        <SummaryCard
          title={'Transaksi Bulan Ini'}
          value={Intl.NumberFormat('id-ID').format(transaksi.todayTotal)}
          icon={<AiOutlineTransaction />}
        />
        <SummaryCard
          title={'Barang Terjual Bulan Ini'}
          value={transaksi.todayQty.toString()}
          icon={<FaBoxOpen />}
        />
        <SummaryCard
          title={'Sisa Stok Barang'}
          value={stok.toString()}
          icon={<FaBoxes />}
        />
      </div>
    </>
  );
}
