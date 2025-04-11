
import React from 'react';
import { Seat as SeatType } from '@/types';
import { useSeat } from '@/contexts/SeatContext';
import { cn } from '@/lib/utils';

interface SeatProps {
  seat: SeatType;
}

const Seat: React.FC<SeatProps> = ({ seat }) => {
  const { selectedSeats, selectSeat, deselectSeat } = useSeat();
  const isSelected = selectedSeats.includes(seat.id);
  
  const handleClick = () => {
    if (seat.isBooked) return; // Don't allow clicking booked seats
    
    if (isSelected) {
      deselectSeat(seat.id);
    } else {
      selectSeat(seat.id);
    }
  };
  
  return (
    <div
      className={cn(
        'seat',
        seat.isBooked ? 'seat-unavailable' : isSelected ? 'seat-selected' : 'seat-available'
      )}
      onClick={handleClick}
      role="button"
      aria-label={`Seat ${seat.seatNumber}`}
      aria-pressed={isSelected}
      tabIndex={0}
    >
      {seat.seatNumber}
    </div>
  );
};

export default Seat;
