import {Bike} from "./Bike";
export const HOST_NAME:string = 'http://192.168.219.244:3000';

export enum Roles {
    User = 'user',
    Admin = 'admin',
}

export interface UserInterface {
    id: number,
    secondName: string,
    firstName: string,
    phone: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
    token: string,
    role: Roles,
}

export interface DriveInterface{
    id: number,
    user: UserInterface,
    bike: Bike,
    startTime: Date,
    endTime: Date,
    cost: number,
}
export enum BikeStatus {
    Serviceable = 'Serviceable',
    OutOfOrder = 'OutOfOrder',
}
export interface CreateBikeDto {
     modelName: string;

     description: string;

     isAvailable: boolean;

     longitude: number;

     latitude: number;

     hourlyPrice: number;

     status: BikeStatus;
}
