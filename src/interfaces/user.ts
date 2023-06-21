import { Role } from '@prisma/client';

export default interface IUser {
  nama: string;
  email: string;
  password: string;
  role: Role;
  alamat: string;
  no_hp: string;
}

export interface IUserWId extends IUser {
  id: number;
}

export interface IUserWDate extends IUser {
  createdAt: Date;
  updatedAt: Date;
}
