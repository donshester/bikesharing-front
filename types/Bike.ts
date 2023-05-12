export interface BikeLocation {
    id: number;
    longitude: number;
    latitude: number;
}

export interface BikeInfo {
    modelName: string;
    description: string;
    hourlyPrice: number;
}

export interface Bike extends BikeLocation, BikeInfo {}
