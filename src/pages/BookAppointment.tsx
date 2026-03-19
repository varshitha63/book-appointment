import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDentistById } from '../services/api';
import BookingForm from '../components/BookingForm';
import Loader from '../components/Loader';

const BookAppointment: React.FC = () => {
  const { dentistId } = useParams<{ dentistId: string }>();
  const [dentist, setDentist] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDentist = async () => {
      if (!dentistId) return;
      try {
        const data = await getDentistById(dentistId);
        setDentist(data);
      } catch (err) {
        setError('Failed to load dentist details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDentist();
  }, [dentistId]);

  if (loading) return <Loader />;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;
  if (!dentist) return <div className="text-center py-12">Dentist not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BookingForm dentistId={dentist.id} dentistName={dentist.name} />
    </div>
  );
};

export default BookAppointment;
