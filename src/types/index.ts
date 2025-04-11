
export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Seat {
  id: number;
  row: number;
  seatNumber: string;
  isBooked: boolean;
  bookedBy?: string; // User ID
}

export interface Booking {
  id: string;
  userId: string;
  seats: number[];
  bookingDate: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
