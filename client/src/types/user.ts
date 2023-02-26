export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: null | EpochTimeStamp;
  created_at: EpochTimeStamp;
  updated_at: EpochTimeStamp;
  is_admin: boolean;
}
