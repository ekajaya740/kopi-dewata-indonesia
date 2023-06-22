import { getProductStock } from '@/app/actions/getProductStock';
import { getSummaryTransactions } from '@/app/actions/getSummaryTransactions';
import SummaryCard from '@/components/SummaryCard';
import { Suspense } from 'react';
import { AiOutlineTransaction } from 'react-icons/ai';
import { FaBoxOpen, FaBoxes } from 'react-icons/fa';
import Loading from '../loading';
import { VerfikasiType } from '@prisma/client';
import cn from 'classnames';

export default async function Page() {
  const transaksi = await getSummaryTransactions();
  const stok = await getProductStock();
  return (
    <>
      <h1 className='font-bold text-4xl pb-8'>Dashboard</h1>
      <Suspense fallback={<Loading />}>
        <div className='flex flex-wrap justify-between gap-4'>
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
        <div className='py-8'>
          <h2 className='font-bold text-2xl'>Daftar Transaksi Hari Ini</h2>
          <div className='w-full overflow-x-auto'>
            <table className='table'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Barang</th>
                  <th>Qty</th>
                  <th>Total Belanja</th>
                  <th>Tanggal Transaksi</th>
                  <th>Status Verifikasi</th>
                </tr>
              </thead>
              <tbody>
                {transaksi.transactions.map((item) => (
                  <tr>
                    <th>
                      <p className='font-bold'>{item.id}</p>
                    </th>
                    <th>
                      <p className='font-bold'>{item.produk.nama}</p>
                    </th>
                    <th>
                      <p className='font-bold'>{item.qty}</p>
                    </th>
                    <th>
                      <p className='font-bold'>
                        {Intl.NumberFormat('ID-id', {
                          style: 'currency',
                          currency: 'IDR',
                        }).format(item.total)}
                      </p>
                    </th>
                    <th>
                      <p className='font-bold'>
                        {Intl.DateTimeFormat('id-ID', {
                          dateStyle: 'long',
                          timeStyle: 'short',
                        }).format(new Date(item.tanggal_beli))}
                      </p>
                    </th>
                    <th>
                      <p
                        className={cn('font-bold', {
                          'text-success':
                            item.verified === VerfikasiType.VERIFIED,
                          'text-neutral':
                            item.verified === VerfikasiType.UNVERIFIED,
                          'text-error':
                            item.verified === VerfikasiType.REJECTED,
                        })}>
                        {item.verified}
                      </p>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Suspense>
    </>
  );
}
