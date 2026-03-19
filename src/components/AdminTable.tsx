import React from 'react';
import { Trash2, CalendarX2 } from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  appointmentDate: string;
  dentistName: string;
  clinicName: string;
  status: string;
}

interface AdminTableProps {
  appointments: Appointment[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: string) => void;
}

const AdminTable: React.FC<AdminTableProps> = ({ appointments, onDelete, onStatusChange }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Booked':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  if (appointments.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <CalendarX2 className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">No appointments found</h3>
        <p className="text-slate-500 text-sm">There are no appointments matching your current filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[12px] border border-slate-200 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Patient</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Age</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Gender</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Dentist</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Clinic</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app.id} className="bg-[#f5f5f5] border-b border-white last:border-0 hover:bg-slate-200/50 transition-colors group">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-900">{app.patientName}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-600 font-medium">{app.age}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-600 font-medium">{app.gender}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-600 font-medium">{app.appointmentDate}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-900">{app.dentistName}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-600 font-medium">{app.clinicName}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <select
                      value={app.status}
                      onChange={(e) => onStatusChange(app.id, e.target.value)}
                      className={`text-[10px] font-bold uppercase tracking-wider rounded-lg px-3 py-1.5 border focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer transition-all ${getStatusStyles(app.status)}`}
                    >
                      <option value="Booked">Booked</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onDelete(app.id)}
                      className="text-slate-400 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition-all active:scale-90"
                      title="Delete Appointment"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
