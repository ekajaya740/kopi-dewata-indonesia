import { KategoriType, kategori, produk } from '@prisma/client';
import { GiCoffeeBeans, GiCoffeeCup } from 'react-icons/gi';
import capitalize from 'capitalize';
import Image from 'next/image';
import cn from 'classnames';
import Link from 'next/link';

export interface KategoriCardProps {
  produk: produk & {
    kategori: kategori[];
  };
  actions?: React.ReactNode;
}
const ProdukCard = (props: KategoriCardProps) => {
  return (
    <div className='card bg-neutral card-compact hover:bg-primary-100'>
      <figure className='w-full h-80'>
        <Image
          src={`/upload/produk/${props.produk.foto}`}
          alt={''}
          width={300}
          height={200}
          className='object-cover w-full h-full'
        />
      </figure>
      <div className='card-body'>
        <div className='flex flex-wrap gap-1'>
          <div className='badge'>
            {capitalize.words(props.produk.kategori[0].type).replace('_', ' ')}
          </div>
          <div className='badge'>
            {capitalize
              .words(props.produk.kategori[0].varietas)
              .replace('_', ' ')}
          </div>
          <div className='badge'>
            {capitalize
              .words(props.produk.kategori[0].process)
              .replace('_', ' ')}
          </div>
          <div
            className={cn('badge', {
              hidden: props.produk.kategori[0].grind_size === 'NONE',
            })}>
            {capitalize
              .words(props.produk.kategori[0].grind_size)
              .replace('_', ' ')}
          </div>
          <div
            className={cn('badge', {
              hidden: props.produk.kategori[0].roast_level === 'NONE',
            })}>
            {capitalize
              .words(props.produk.kategori[0].roast_level)
              .replace('_', ' ')}
          </div>
        </div>
        <Link href={`/produk/${props.produk.id}`}>
          <h1 className='text-xl'>{props.produk.nama}</h1>
          <p className='card-title'>
            {Intl.NumberFormat('ID-id', {
              style: 'currency',
              currency: 'IDR',
            }).format(props.produk.harga)}
          </p>
          <p>Stok: {props.produk.stok}</p>
        </Link>
        <div className='card-actions'>{props.actions && props.actions}</div>
      </div>
    </div>
  );
};

export default ProdukCard;
