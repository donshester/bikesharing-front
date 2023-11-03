import {BikeStatus} from "./mocks";

export interface BikeLocation {
    id: number;
    longitude: number;
    latitude: number;
}


export interface BikeInfo {
    modelName: string;
    description: string;
    hourlyPrice: number;
    isAvailable: boolean;
    status: BikeStatus;
}

export interface Bike extends BikeLocation, BikeInfo {}

export interface CreateBikeResponse extends BikeLocation{
    token:string;
}
