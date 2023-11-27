export interface queryUserInfoResponseInterface {
  open_id: string;
  union_id: string;
  avatar_url: string;
  avatar_url100: string;
  avatar_large_url: string;
  display_name: string;
  bio_description: string;
  profile_deep_link: string;
  is_verified: string;
  follower_count: string;
  following_count: string;
  likes_count: string;
  video_count: string;
}

export interface queryAdvertisersResponseInterface {
  advertisers: Advertiser[];
}

export interface Advertiser {
  business_id: number;
  business_name: string;
  country_code: string;
}

export interface Error {
  code: string;
  http_status_code: number;
  log_id: string;
  message: string;
}

export interface fieldsTalbe {
  position: number;
  field: string;
  value: any;
}
