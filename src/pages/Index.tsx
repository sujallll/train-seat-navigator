
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Train, Users, CalendarCheck } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-rail-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Book Your Train Seats with Ease
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our seat reservation system makes it simple to book the perfect seats for your journey.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              className="bg-white text-rail-primary hover:bg-gray-100"
              size="lg"
              onClick={() => navigate('/signup')}
            >
              Sign Up Free
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              size="lg"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-rail-background rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rail-primary/10 text-rail-primary rounded-full mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Create an Account</h3>
              <p className="text-gray-600">
                Sign up for a free account to start booking train seats.
              </p>
            </div>
            
            <div className="text-center p-6 bg-rail-background rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rail-primary/10 text-rail-primary rounded-full mb-4">
                <Train size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Select Your Seats</h3>
              <p className="text-gray-600">
                Browse the seating plan and choose up to 7 available seats.
              </p>
            </div>
            
            <div className="text-center p-6 bg-rail-background rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rail-primary/10 text-rail-primary rounded-full mb-4">
                <CalendarCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Confirm Booking</h3>
              <p className="text-gray-600">
                Review your selection and confirm your seat reservation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-rail-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Book Your Seats?</h2>
          <p className="text-xl mb-8 max-w-xl mx-auto text-gray-600">
            Join thousands of travelers who use our platform for hassle-free seat reservations.
          </p>
          <Button 
            className="bg-rail-primary hover:bg-rail-primary/90"
            size="lg"
            onClick={() => navigate('/signup')}
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
