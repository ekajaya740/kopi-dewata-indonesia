import { getAllUserTransaksi } from '@/app/actions/getAllUserTransaksi';
import { VerfikasiType } from '@prisma/client';
import cn from 'classnames';

export default async function Page() {
  const transaksi = await getAllUserTransaksi();

  return (
    <div className='w-full container mx-auto space-y-4 pt-8'>
      <h1 className='text-3xl font-bold'>Daftar Transaksi</h1>
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
            {transaksi &&
              transaksi.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.produk.nama}</td>
                  <td>{item.qty}</td>
                  <td>
                    {Intl.NumberFormat('ID-id', {
                      style: 'currency',
                      currency: 'IDR',
                    }).format(item.total)}
                  </td>
                  <td>
                    {Intl.DateTimeFormat('id-ID', {
                      dateStyle: 'long',
                      timeStyle: 'short',
                    }).format(new Date(item.tanggal_beli))}
                  </td>
                  <td>
                    <p
                      className={cn('font-bold', {
                        'text-success':
                          item.verified === VerfikasiType.VERIFIED,
                        'text-neutral':
                          item.verified === VerfikasiType.UNVERIFIED,
                        'text-error': item.verified === VerfikasiType.REJECTED,
                      })}>
                      {item.verified}
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
