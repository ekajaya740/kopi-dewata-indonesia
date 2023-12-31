'use client';

import { getAllProduct } from '@/app/actions/getAllProduct';
import Link from 'next/link';
import { RiAddCircleFill } from 'react-icons/ri';
import Image from 'next/image';
import { deleteProduct } from '@/app/actions/deleteProduct';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../loading';
import { BsPenFill, BsTrash2Fill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: barang,
    isError,
    error,
  } = useQuery(['barang'], getAllProduct);

  const mutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(['barang']);
    },
  });

  console.log(barang);

  return (
    <>
      <h1 className='font-bold text-4xl pb-8'>Manajemen Barang</h1>
      <div className='flex justify-end w-full'>
        <Link href={'/admin/barang/baru'} className='btn btn-primary'>
          <RiAddCircleFill />
          <p>Tambah Barang</p>
        </Link>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='overflow-x-auto'>
          <table className='table'>
            <thead>
              <tr>
                <th>Gambar</th>
                <th>ID</th>
                <th>Tipe Produk</th>
                <th>Varietas</th>
                <th>Grind Size</th>
                <th>Process</th>
                <th>Roast Level</th>
                <th>Stok</th>
                <th>Harga</th>
                <th>Deskripsi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {barang &&
                barang.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <Image
                        src={`/upload/produk/${item.foto}`}
                        alt={`Foto produk ${item.nama}`}
                        width={40}
                        height={40}
                      />
                    </td>
                    <td>{item.id}</td>
                    <td>
                      <p className='break-normal truncate'>
                        {item.kategori[0].type}
                      </p>
                    </td>
                    <td>
                      <p className='break-normal truncate'>
                        {item.kategori[0].varietas}
                      </p>
                    </td>
                    <td>
                      <p className='break-normal truncate'>
                        {item.kategori[0].grind_size}
                      </p>
                    </td>
                    <td>
                      <p className='break-normal truncate'>
                        {item.kategori[0].process}
                      </p>
                    </td>
                    <td>
                      <p className='break-normal truncate'>
                        {item.kategori[0].roast_level}
                      </p>
                    </td>
                    <td>{item.stok}</td>
                    <td>
                      {Intl.NumberFormat('ID-id', {
                        style: 'currency',
                        currency: 'IDR',
                      }).format(item.harga)}
                    </td>
                    <td>{item.deskripsi}</td>
                    <td className='space-x-2 flex'>
                      <Link
                        href={`/admin/barang/${item.id}/edit`}
                        className='btn btn-warning'>
                        <BsPenFill />
                      </Link>
                      <button
                        className='btn btn-error'
                        onClick={() => {
                          mutation.mutate(item.id);
                          toast.success('Berhasil menghapus barang');
                        }}>
                        <BsTrash2Fill className='text-white' />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Page;
