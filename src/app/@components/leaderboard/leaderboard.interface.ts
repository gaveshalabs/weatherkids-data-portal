export interface Player {
    id: string;
    name: string;
    img_url: string;
    kite_height: string;
    rank: string;
    city: string;
}

export interface TotalKiteData {
    all_time: {
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
}

