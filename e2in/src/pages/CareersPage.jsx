import React from 'react';
import { Link } from 'react-router-dom';
import Careers from '@/components/Careers';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CareersPage = () => {
  return (
    <div className="relative">
      <div className="absolute top-4 left-4 z-10">
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      <Careers />
    </div>
  );
};

export default CareersPage;