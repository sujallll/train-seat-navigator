
import React from 'react';
import { useSeat } from '@/contexts/SeatContext';
import { useAuth } from '@/contexts/AuthContext';
import SeatMap from '@/components/SeatMap';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { loading } = useSeat();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rail-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.username}!</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Book Your Seats</h2>
        <p className="text-gray-600 mb-4">
          Select up to 7 seats from the seating plan below. We'll prioritize booking seats in the same row.
        </p>
      </div>
      
      <SeatMap />

      {/* Admin Panel (for demo purposes) */}
      {user?.id === '1' && (
        <div className="mt-8 p-4 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Admin Controls</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                const { resetAllBookings } = useSeat();
                if (window.confirm('Are you sure you want to reset all bookings? This cannot be undone.')) {
                  resetAllBookings();
                }
              }}
              className="bg-destructive text-white px-4 py-2 rounded hover:bg-destructive/90"
            >
              Reset All Bookings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
