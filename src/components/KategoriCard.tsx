import { KategoriType, kategori } from '@prisma/client';
import { GiCoffeeBeans, GiCoffeeCup } from 'react-icons/gi';

const capitalize = require('capitalize');

const KategoriCard = (props: kategori) => {
  return (
    <div className='card bg-neutral w-full'>
      <div className='card-body flex flex-col justify-center items-center text-center space-y-1'>
        {props.type === KategoriType.GREEN_BEAN ? (
          <GiCoffeeBeans className='text-green-500 text-8xl' />
        ) : props.type === KategoriType.ROAST_BEAN ? (
          <GiCoffeeBeans className='text-amber-500 text-8xl' />
        ) : (
          <GiCoffeeCup className='text-amber-500 text-8xl' />
        )}
        {/* <h3 className='font-bold text-2xl'>{capitalize.words(props.nama)}</h3> */}
      </div>
    </div>
  );
};

export default KategoriCard;
