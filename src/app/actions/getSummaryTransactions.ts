import prisma from '@/prisma';
import { VerfikasiType } from '@prisma/client';

export async function getSummaryTransactions() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date();
  endOfMonth.setMonth(endOfMonth.getMonth() + 1, 0);
  endOfMonth.setHours(23, 59, 59, 999);

  const transactions = await prisma.transaksi.findMany({
    where: {
      tanggal_beli: {
        lte: endOfMonth,
        gte: startOfMonth,
      },
    },
    include: {
      produk: true,
    },
  });

  const todayQty = await prisma.transaksi.aggregate({
    where: {
      tanggal_beli: {
        lte: endOfMonth,
        gte: startOfMonth,
      },
      verified: VerfikasiType.VERIFIED,
    },
    _sum: {
      qty: true,
    },
  });
  const todayTransaction = await prisma.transaksi.aggregate({
    where: {
      tanggal_beli: {
        lte: endOfMonth,
        gte: startOfMonth,
      },
    },
    _sum: {
      total: true,
    },
  });

  // const todayTotal = transactions.reduce((acc, curr) => {
  //   return acc + curr.total;
  // }, 0);

  // const todayQty = transactions.reduce((acc, curr) => {
  //   return acc + curr.qty;
  // }, 0);

  return {
    todayTotal: todayTransaction._sum.total,
    todayQty: todayQty._sum.qty,
    transactions,
  };
}
