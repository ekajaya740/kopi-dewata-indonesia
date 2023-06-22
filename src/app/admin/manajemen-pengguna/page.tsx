'use client';

import { changeUserRole } from '@/app/actions/changeUserRole';
import { createAdmin } from '@/app/actions/createAdmin';
import { getAllUser } from '@/app/actions/getAllUser';
import RegisterForm from '@/components/RegisterForm';
import { Role } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import Loading from '../loading';

const Page = () => {
  const { data: user, isLoading } = useQuery(['user'], getAllUser, {
    refetchInterval: 500,
  });
  return (
    <div className='w-full h-screen'>
      <h1 className='text-4xl font-bold pb-8'>Manajemen Pengguna</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!user ? (
            <p>Tidak ada Pengguna</p>
          ) : (
            <div className='w-full overflow-x-auto'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Alamat</th>
                    <th>No. HP</th>
                    <th>Role</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {user.map((item) => (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.nama}</td>
                      <td>{item.email}</td>
                      <td>{item.alamat}</td>
                      <td>{item.no_hp}</td>
                      <td>
                        {
                          <select
                            name='role'
                            id='role'
                            className='select'
                            onChange={(e) => {
                              changeUserRole(
                                item.id,
                                Object.values(Role)[e.target.selectedIndex]
                              );
                            }}
                            defaultValue={
                              item.role === Role.ADMIN ? Role.ADMIN : Role.USER
                            }>
                            {Object.values(Role).map((role) => (
                              <option value={role}>{role}</option>
                            ))}
                          </select>
                        }
                      </td>
                      <td>
                        <button className='btn btn-error' onClick={() => {}}>
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
