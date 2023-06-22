'use client';

import { createProduk } from '@/app/actions/createProduk';
import { getAllCategory } from '@/app/actions/getAllCategory';
import { getAllProduct } from '@/app/actions/getAllProduct';
import { getProdukById } from '@/app/actions/getProdukById';
import { updateProduct } from '@/app/actions/updateProduk';
import {
  GrindSize,
  KategoriType,
  Process,
  RoastLevel,
  Varietas,
  produk,
} from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

const capitalize = require('capitalize');

export interface ProdukFormProps {
  id?: number;
}

const ProdukForm = (props: ProdukFormProps) => {
  const produk = useQuery(['produk', props.id], async () => {
    if (props.id) {
      return await getProdukById(props.id);
    }
  });

  // const produk = await getProductById(props.id);

  // const kategori = useQuery(['kategori'], getAllCategory);

  return (
    <form
      action={async (formData) => {
        if (props.id) {
          await updateProduct(formData, props.id);
        } else {
          await createProduk(formData);
        }
      }}
      className='space-y-4'>
      <input
        type='text'
        name='nama'
        className='w-full input'
        placeholder='Nama Barang'
        defaultValue={produk.data?.nama}
      />
      <input
        type='number'
        name='harga'
        className='w-full input'
        placeholder='Harga'
        defaultValue={produk.data?.harga}
      />
      <input
        type='number'
        name='stok'
        className='w-full input'
        placeholder='Stok'
        defaultValue={produk.data?.stok}
      />
      <textarea
        name='deskripsi'
        className='w-full textarea'
        placeholder='Deskripsi'
        defaultValue={produk.data?.deskripsi}></textarea>
      <input type='file' name='file' className='file-input w-full' />
      <select
        className='select select-bordered w-full'
        name='type'
        defaultValue={produk.data?.kategori.type}>
        <option disabled selected={produk ? true : false}>
          Pilih Tipe Produk
        </option>
        {Object.keys(KategoriType).map((item, index) => (
          <option
            value={item}
            key={index}
            selected={
              produk && produk.data?.kategori.type.toString() === item
                ? true
                : false
            }>
            {Object.values(KategoriType)[index]}
          </option>
        ))}
      </select>
      <select
        className='select select-bordered w-full'
        name='varietas'
        defaultValue={produk.data?.kategori.varietas}>
        <option disabled selected={produk ? true : false}>
          Pilih Varietas
        </option>
        {Object.keys(Varietas).map((item, index) => (
          <option
            value={item}
            key={index}
            selected={
              produk && produk.data?.kategori.varietas.toString() === item
                ? true
                : false
            }>
            {Object.values(Varietas)[index]}
          </option>
        ))}
      </select>
      <select
        className='select select-bordered w-full'
        name='process'
        defaultValue={produk.data?.kategori.process}>
        <option disabled selected={produk ? true : false}>
          Pilih Proses Biji Kopi
        </option>
        {Object.keys(Process).map((item, index) => (
          <option
            value={item}
            key={index}
            selected={
              produk && produk.data?.kategori.process.toString() === item
                ? true
                : false
            }>
            {Object.values(Process)[index]}
          </option>
        ))}
      </select>
      <select
        className='select select-bordered w-full'
        name='roast_level'
        defaultValue={produk.data?.kategori.roast_level}>
        <option disabled selected={produk ? true : false}>
          Pilih Roast Level
        </option>
        {Object.keys(RoastLevel).map((item, index) => (
          <option
            value={item}
            key={index}
            selected={
              produk && produk.data?.kategori.roast_level === item
                ? true
                : false
            }>
            {Object.values(RoastLevel)[index]}
          </option>
        ))}
      </select>
      <select
        className='select select-bordered w-full'
        name='grind_size'
        defaultValue={produk.data?.kategori_id}>
        <option disabled selected={produk ? true : false}>
          Pilih Grind Size
        </option>
        {Object.keys(GrindSize).map((item, index) => (
          <option
            value={item}
            key={index}
            selected={
              produk && produk.data?.kategori.grind_size === item ? true : false
            }>
            {Object.values(GrindSize)[index]}
          </option>
        ))}
      </select>
      <button className='btn btn-primary w-full'>Simpan</button>
    </form>
  );
};

export default ProdukForm;
