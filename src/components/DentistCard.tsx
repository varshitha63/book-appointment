import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Building2, Briefcase, Star, IndianRupee, Clock } from 'lucide-react';

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

interface DentistCardProps {
  dentist: Dentist;
}

const DentistCard: React.FC<DentistCardProps> = ({ dentist }) => {
  const navigate = useNavigate();

  const ctaLabels = ["Book Now", "Schedule Visit", "Check Availability"];
  const randomCta = ctaLabels[Math.floor(Math.random() * ctaLabels.length)];

  // Mock status for UI display as requested
  const status = Math.random() > 0.7 ? "Booked" : "Available";

  return (
    <div
      key={dentist.id}
      className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
    >
      <img
        src={dentist.image || "https://via.placeholder.com/300"}
        alt={dentist.name}
        className="w-full h-56 object-cover object-top rounded-xl mb-4"
        referrerPolicy="no-referrer"
      />

      <h2 className="text-xl font-bold text-gray-800">{dentist.name}</h2>

      <p className="text-sm text-gray-500">{dentist.qualification}</p>

      <p className="text-blue-600 font-medium">{dentist.specialization}</p>

      <p className="text-gray-600">Experience: {dentist.experience} years</p>

      <p className="text-gray-700 font-medium">{dentist.clinicName}</p>

      <p className="text-gray-500 text-sm">{dentist.address}</p>

      <p className="text-gray-500 text-sm">{dentist.location}</p>

      <button 
        onClick={() => navigate(`/book/${dentist.id}`)}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
      >
        Book Appointment
      </button>
    </div>
  );
};

export default DentistCard;
