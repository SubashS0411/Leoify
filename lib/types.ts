export type TripStatus = 'planned' | 'active' | 'completed' | 'caution' | 'sos';

export interface Trip {
  id?: string;
  userId: string;
  title: string;
  status: TripStatus;
  startTime?: string | null;
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
}

export interface UserPublic {
  username: string;
  avatarUrl: string;
}

export interface UserPrivate {
  bloodType: string;
  allergies: string;
  chronicConditions: string;
}

export interface EmergencyContact {
  id?: string;
  name: string;
  phoneNumber: string;
  relationship: string;
}

export interface LiveLocation {
  id?: string;
  lat: number;
  lng: number;
  battery: number;
  signal: string;
  timestamp: any; // Firestore Timestamp
}
