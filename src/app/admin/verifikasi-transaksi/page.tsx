'use client';

import { getAllPendingTransaksi } from '@/app/actions/getAllPendingTransaksi';
import verifyTransaksi from '@/app/actions/verifyTransaksi';
import { VerfikasiType } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

const Page = () => {
  const { data: transaksi } = useQuery(
    ['transaksi', 'pending'],
    getAllPendingTransaksi
  );

  return (
    <div>
      <h1 className='font-bold text-4xl pb-8'>Verifikasi Transaksi</h1>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Tanggal</th>
              <th>Barang</th>
              <th>Jumlah</th>
              <th>Total</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transaksi &&
              transaksi.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <p>
                      {new Date(item.tanggal_beli).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </td>
                  <td>{item.user.nama}</td>
                  <td>{item.user.alamat}</td>
                  <td>{item.produk.nama}</td>
                  <td>{item.qty}</td>
                  <td>{item.total}</td>
                  <td>{item.verified}</td>
                  <td className='space-x-1'>
                    <button
                      className='btn btn-success'
                      onClick={async () => {
                        await verifyTransaksi(item.id, VerfikasiType.VERIFIED);
                      }}>
                      Verifikasi
                    </button>
                    <button
                      className='btn btn-error'
                      onClick={async () => {
                        await verifyTransaksi(item.id, VerfikasiType.REJECTED);
                      }}>
                      Tolak
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
