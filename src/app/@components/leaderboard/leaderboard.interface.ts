export interface Player {
    id: string;
    name: string;
    img_url: string;
    kite_height: string;
    rank: string;
    city: string;
}

export interface TotalKiteData {
    player: {
        name: string;
        city: string;
        rank: number;
        img_url: string;
        user_id: string;
        id: string;
    };
    stat: { all_time: {
        max_height: number;
        total_height: number;
        total_attempts: number;
        total_flying_mins: number;
    };
    current_week?: {
        total_height: number;
        total_attempts: number;
        total_flying_mins: number;
        max_height: number;
        min_height: number;
    };
    };
}

export interface AgeGroupData{
    total_kite_players: number;
    total_attempts: number;
    age_group: string;
}

export interface DistrictData{
    total_players: number;
    total_attempts: number;
    nearest_district: string;
}



export interface KitePlayer {
    _id: string;
    name: string;
    birthday: string;
    user_id: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    city: string;
    nearest_city: string;
    nearest_district: string;
    img_url: string;
    isBot: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Attempt {
    attempt_timestamp: string;
    height: number;
}

export interface PlayerData {
    kitePlayer: KitePlayer;
    attempts: Attempt[];
}

export interface AttemptData {
    data: {
        timestamp: string;
        height: number;
    }[];
}

