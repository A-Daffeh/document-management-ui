export interface IUser {
    id: number;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bio: string;
    qrCodeImageUri?: string;
    imageUrl: string;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    lastLogin: string | number | Date;
    enabled: boolean;
    mfa: boolean;
    createdAt: string;
    updateAt: string;
    createdBy: number;
    updatedBy: number;
    role: string;
    authorities: string;
}

export type Role = { role: string };

export type User = { user: IUser };

export type Users = { users: IUser[] };

export type QrCodeRequest = Pick<IUser, "userId"> & 
{ qrCode?: any, qrCode1: any, qrCode2: any, qrCode3: any, qrCode4: any, qrCode5: any, qrCode6: any };