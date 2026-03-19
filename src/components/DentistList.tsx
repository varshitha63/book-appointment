import React from 'react';
import DentistCard from './DentistCard';

interface Dentist {
  id: string;
  name: string;
  qualification: string;
  experience: string;
  clinicName: string;
  address: string;
  location: string;
  image: string;
  rating?: number;
  reviewsCount?: number;
  specialization: string;
  consultationFee?: string;
  availability?: string;
}

interface DentistListProps {
  dentists: Dentist[];
}

const DentistList: React.FC<DentistListProps> = ({ dentists }) => {
  if (dentists.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 text-lg">No dentists available matching your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {dentists.map((dentist) => (
        <DentistCard key={dentist.id} dentist={dentist} />
      ))}
    </div>
  );
};

export default DentistList;
