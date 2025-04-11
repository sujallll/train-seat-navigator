
import React from 'react';
import Seat from './Seat';
import { useSeat } from '@/contexts/SeatContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SeatMap: React.FC = () => {
  const { seats, selectedSeats, bookSelectedSeats } = useSeat();
  
  // Group seats by row
  const seatsByRow = seats.reduce((acc, seat) => {
    const row = seat.row;
    if (!acc[row]) {
      acc[row] = [];
    }
    acc[row].push(seat);
    return acc;
  }, {} as Record<number, typeof seats>);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Train Coach Seating Plan</CardTitle>
        <CardDescription className="text-center">
          Click on an available seat to select it. You can select up to 7 seats at a time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <div className="seat-available w-4 h-4 mr-2 rounded"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center">
            <div className="seat-selected w-4 h-4 mr-2 rounded"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="seat-unavailable w-4 h-4 mr-2 rounded"></div>
            <span className="text-sm">Booked</span>
          </div>
        </div>
        
        {/* Display train coach at the top */}
        <div className="flex justify-center mb-8">
          <div className="bg-rail-primary text-white p-2 rounded-t-3xl w-[250px] text-center">
            LOCOMOTIVE
          </div>
        </div>
        
        {/* Seat Map */}
        <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
          {Object.entries(seatsByRow).map(([row, rowSeats]) => (
            <div key={row} className="mb-4">
              <div className="flex justify-center gap-2">
                {rowSeats.map(seat => (
                  <Seat key={seat.id} seat={seat} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-medium">Selected Seats: {selectedSeats.length}</p>
            <p className="text-sm text-gray-500">
              {selectedSeats.length > 0 
                ? seats
                    .filter(seat => selectedSeats.includes(seat.id))
                    .map(seat => seat.seatNumber)
                    .join(', ')
                : 'No seats selected'}
            </p>
          </div>
          <Button 
            onClick={bookSelectedSeats} 
            disabled={selectedSeats.length === 0}
            className="bg-rail-secondary hover:bg-rail-secondary/90"
          >
            Book Selected Seats
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SeatMap;
