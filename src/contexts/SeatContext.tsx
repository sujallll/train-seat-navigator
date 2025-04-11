
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Seat, Booking } from '@/types';
import { useAuth } from './AuthContext';
import { toast } from '@/components/ui/use-toast';

// Constants for seat configuration
const TOTAL_SEATS = 80;
const SEATS_PER_ROW = 7;
const LAST_ROW_SEATS = 3;
const MAX_SEATS_PER_BOOKING = 7;

interface SeatContextType {
  seats: Seat[];
  selectedSeats: number[];
  userBookings: Booking[];
  selectSeat: (seatId: number) => void;
  deselectSeat: (seatId: number) => void;
  bookSelectedSeats: () => void;
  cancelBooking: (bookingId: string) => void;
  resetAllBookings: () => void;
  loading: boolean;
}

const SeatContext = createContext<SeatContextType | undefined>(undefined);

// Helper function to generate initial seats
const generateInitialSeats = (): Seat[] => {
  const seats: Seat[] = [];
  let seatId = 1;
  
  // Calculate the number of full rows
  const fullRows = Math.floor((TOTAL_SEATS - LAST_ROW_SEATS) / SEATS_PER_ROW);
  const totalRows = fullRows + 1; // +1 for the last row with fewer seats
  
  // Generate seats for full rows
  for (let row = 1; row <= fullRows; row++) {
    for (let seat = 1; seat <= SEATS_PER_ROW; seat++) {
      seats.push({
        id: seatId,
        row,
        seatNumber: `${row}${String.fromCharCode(64 + seat)}`, // Convert to letter (1A, 1B, etc.)
        isBooked: false,
      });
      seatId++;
    }
  }
  
  // Generate seats for the last row with fewer seats
  for (let seat = 1; seat <= LAST_ROW_SEATS; seat++) {
    seats.push({
      id: seatId,
      row: totalRows,
      seatNumber: `${totalRows}${String.fromCharCode(64 + seat)}`,
      isBooked: false,
    });
    seatId++;
  }
  
  return seats;
};

// Generate MOCK_BOOKINGS for demo purposes
const MOCK_BOOKINGS: Booking[] = [];

export const SeatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [seats, setSeats] = useState<Seat[]>(() => {
    // Try to get seats from localStorage
    const storedSeats = localStorage.getItem('seats');
    return storedSeats ? JSON.parse(storedSeats) : generateInitialSeats();
  });
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Load user bookings when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      // In a real app, fetch user bookings from API
      const userSpecificBookings = MOCK_BOOKINGS.filter(booking => booking.userId === user.id);
      setUserBookings(userSpecificBookings);
    } else {
      setUserBookings([]);
    }
    setLoading(false);
  }, [isAuthenticated, user]);

  // Save seats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('seats', JSON.stringify(seats));
  }, [seats]);

  const selectSeat = (seatId: number) => {
    // Prevent selecting if not authenticated
    if (!isAuthenticated) {
      toast({
        title: 'Authentication required',
        description: 'Please login to select seats',
        variant: 'destructive',
      });
      return;
    }
    
    // Find the seat
    const seat = seats.find(s => s.id === seatId);
    
    if (!seat || seat.isBooked) {
      return; // Seat doesn't exist or is already booked
    }
    
    // Prevent selecting more than MAX_SEATS_PER_BOOKING
    if (selectedSeats.length >= MAX_SEATS_PER_BOOKING) {
      toast({
        title: 'Maximum seats exceeded',
        description: `You can only select up to ${MAX_SEATS_PER_BOOKING} seats at a time.`,
        variant: 'destructive',
      });
      return;
    }
    
    // Add to selected seats
    setSelectedSeats(prev => [...prev, seatId]);
  };

  const deselectSeat = (seatId: number) => {
    setSelectedSeats(prev => prev.filter(id => id !== seatId));
  };

  const bookSelectedSeats = () => {
    if (!isAuthenticated || !user) {
      toast({
        title: 'Authentication required',
        description: 'Please login to book seats',
        variant: 'destructive',
      });
      return;
    }
    
    if (selectedSeats.length === 0) {
      toast({
        title: 'No seats selected',
        description: 'Please select at least one seat to book',
        variant: 'destructive',
      });
      return;
    }
    
    // Create a new booking
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      userId: user.id,
      seats: [...selectedSeats],
      bookingDate: new Date(),
    };
    
    // Update seats
    setSeats(prevSeats => 
      prevSeats.map(seat => 
        selectedSeats.includes(seat.id) 
          ? { ...seat, isBooked: true, bookedBy: user.id } 
          : seat
      )
    );
    
    // Add to bookings
    MOCK_BOOKINGS.push(newBooking);
    setUserBookings(prev => [...prev, newBooking]);
    
    // Clear selected seats
    setSelectedSeats([]);
    
    toast({
      title: 'Booking successful',
      description: `Successfully booked ${selectedSeats.length} seat(s)`,
    });
  };

  const cancelBooking = (bookingId: string) => {
    // Find the booking
    const bookingIndex = MOCK_BOOKINGS.findIndex(b => b.id === bookingId);
    
    if (bookingIndex === -1) {
      toast({
        title: 'Booking not found',
        description: 'The requested booking could not be found',
        variant: 'destructive',
      });
      return;
    }
    
    const booking = MOCK_BOOKINGS[bookingIndex];
    
    // Ensure the booking belongs to the current user
    if (booking.userId !== user?.id) {
      toast({
        title: 'Unauthorized',
        description: 'You can only cancel your own bookings',
        variant: 'destructive',
      });
      return;
    }
    
    // Update seats
    setSeats(prevSeats => 
      prevSeats.map(seat => 
        booking.seats.includes(seat.id) 
          ? { ...seat, isBooked: false, bookedBy: undefined } 
          : seat
      )
    );
    
    // Remove from bookings
    MOCK_BOOKINGS.splice(bookingIndex, 1);
    setUserBookings(prev => prev.filter(b => b.id !== bookingId));
    
    toast({
      title: 'Booking cancelled',
      description: 'Your booking has been successfully cancelled',
    });
  };

  const resetAllBookings = () => {
    // This would typically be an admin function
    // Reset all seats
    setSeats(generateInitialSeats());
    
    // Clear all bookings
    MOCK_BOOKINGS.length = 0;
    setUserBookings([]);
    
    toast({
      title: 'All bookings reset',
      description: 'All seat bookings have been cleared',
    });
  };

  return (
    <SeatContext.Provider
      value={{
        seats,
        selectedSeats,
        userBookings,
        selectSeat,
        deselectSeat,
        bookSelectedSeats,
        cancelBooking,
        resetAllBookings,
        loading,
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};

export const useSeat = () => {
  const context = useContext(SeatContext);
  if (context === undefined) {
    throw new Error('useSeat must be used within a SeatProvider');
  }
  return context;
};
