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

export interface PlayerDataSummary {
    author_user_id: string;
    timestamp: number;
    player_id: string;
    kight_height: number;
    attemps: number;
}

export interface PlayerDatum {
    createdAt: string;
    author_user_id: string;
    timestamp: number;
    player_id: string;
    kight_height: number;
    attemps: number;
    updatedAt: string;
}

export interface KiteData {
    createdAt: string;
    author_user_id: string;
    timestamp: number;
    player_id: string;
    kight_height: number;
    attemps: number;
    updatedAt: string;
}

export interface PlayerSummary {
    playerData: PlayerDataSummary;
    pointsOfUser: {
        author_user_id: string;
        amount: number;
        last_playerdata_uploaded_timestamp: number;
    };
}
