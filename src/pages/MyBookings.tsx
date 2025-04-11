
import React from 'react';
import { useSeat } from '@/contexts/SeatContext';
import { useAuth } from '@/contexts/AuthContext';
import BookingCard from '@/components/BookingCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const MyBookings: React.FC = () => {
  const { userBookings, loading } = useSeat();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rail-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      
      {userBookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userBookings.map(booking => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">No Bookings Found</h2>
          <p className="text-gray-600 mb-6">
            You haven't made any seat reservations yet.
          </p>
          <Button 
            onClick={() => navigate('/dashboard')} 
            className="bg-rail-primary hover:bg-rail-primary/90"
          >
            Book Seats Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
