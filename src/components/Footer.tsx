
import React from 'react';
import { Train } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-rail-primary text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Train size={20} className="mr-2" />
            <span className="font-bold text-lg">Train Seat Navigator</span>
          </div>
          
          <div className="text-sm text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} Train Seat Navigator. All rights reserved.</p>
            <p className="mt-1">Book your journey with ease</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
