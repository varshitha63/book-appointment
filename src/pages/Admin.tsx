import React, { useState, useEffect } from 'react';
import { getAppointments, deleteAppointment, updateAppointmentStatus } from '../services/api';
import AdminTable from '../components/AdminTable';
import Loader from '../components/Loader';

const Admin: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      console.error("fetchAppointments error", err);
      setError('Failed to load appointments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteAppointment(id);
      setAppointments(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete appointment.");
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateAppointmentStatus(id, newStatus);
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    } catch (err) {
      console.error("Status update error:", err);
      setError("Failed to update status.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Admin Panel</h1>
        <p className="text-slate-500 font-medium">View and manage all patient appointments.</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader />
          <p className="text-slate-400 mt-4 font-medium animate-pulse">Fetching appointments...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-8 rounded-3xl text-center font-bold border border-red-100">
          {error}
        </div>
      ) : (
        <AdminTable 
          appointments={appointments} 
          onDelete={handleDelete} 
          onStatusChange={handleStatusChange} 
        />
      )}
    </div>
  );
};

export default Admin;
