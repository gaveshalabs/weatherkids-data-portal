import { ICoordinates } from './coordinates.interface';

// WeatherStation interface
export interface WeatherStation {
    _id: string;
    name: string;
    coordinates: ICoordinates;
    user_ids: string[];
}
