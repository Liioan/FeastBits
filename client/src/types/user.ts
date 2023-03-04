export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  email_verified_at: null | EpochTimeStamp;
  created_at: EpochTimeStamp;
  updated_at: EpochTimeStamp;
  is_admin: boolean;
}
