import { ICoordinates } from './coordinates.interface';

// WeatherStation interface
export interface WeatherStation {
    _id: string;
    name: string;
    coordinates: ICoordinates;
    user_ids: string[];
    nearest_city: string;
}

export interface WeatherDataSummary {
    coordinates: ICoordinates;
    timestamp: number;
    weather_station_id: string;
    author_user_id: string;
    pressure: number;
    temperature: number;
    humidity: number;
    percentage_light_intensity: number;
    tvoc: number;
}

export interface WeatherStationSummary {
    weatherData: WeatherDataSummary;
    pointsOfUser: {
        author_user_id: string;
        amount: number;
        last_weatherdata_uploaded_timestamp: number;
    };
}
