import KategoriCard from '@/components/KategoriCard';
import prisma from '@/prisma';

async function getKategori() {
  'use server';

  const kategori = await prisma.kategori.findMany();

  return kategori;
}

export default async function Page() {
  const kategori = await getKategori();

  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-4 justify-items-center gap-2'>
        {kategori.map((kategori) => (
          <KategoriCard {...kategori} key={kategori.id} />
        ))}
      </div>
    </div>
  );
}
