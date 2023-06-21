import ProdukForm from '@/components/ProdukForm';

const Page = ({ params }: { params: { id: number } }) => {
  console.log(params.id);
  return (
    <div>
      <h1 className='font-bold text-4xl pb-8'>Edit Barang</h1>
      <ProdukForm id={Number(params.id)} />
    </div>
  );
};

export default Page;
