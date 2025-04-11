
import React from 'react';
import { Booking, Seat } from '@/types';
import { useSeat } from '@/contexts/SeatContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const { seats, cancelBooking } = useSeat();
  
  // Get seat details for this booking
  const bookingSeats = seats.filter(seat => booking.seats.includes(seat.id));
  
  // Group seats by row for better display
  const seatsByRow = bookingSeats.reduce((acc, seat) => {
    const row = seat.row;
    if (!acc[row]) {
      acc[row] = [];
    }
    acc[row].push(seat);
    return acc;
  }, {} as Record<number, Seat[]>);
  
  // Format booking time
  const bookingTime = booking.bookingDate instanceof Date
    ? formatDistanceToNow(booking.bookingDate, { addSuffix: true })
    : formatDistanceToNow(new Date(booking.bookingDate), { addSuffix: true });
  
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(booking.id);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking #{booking.id.substring(booking.id.length - 5)}</CardTitle>
        <CardDescription>
          Booked {bookingTime}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Seat Details</h4>
            <div className="space-y-2">
              {Object.entries(seatsByRow).map(([row, rowSeats]) => (
                <div key={row} className="flex items-center">
                  <span className="text-sm font-medium w-16">Row {row}:</span>
                  <div className="flex flex-wrap gap-1">
                    {rowSeats.map(seat => (
                      <span 
                        key={seat.id}
                        className="bg-rail-primary text-white px-2 py-1 rounded text-xs"
                      >
                        {seat.seatNumber}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Booking Summary</h4>
            <p className="text-sm">Total Seats: {booking.seats.length}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="destructive" 
          onClick={handleCancel}
          className="w-full"
        >
          Cancel Booking
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
