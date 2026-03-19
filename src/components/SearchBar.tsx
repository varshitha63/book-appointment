import React from 'react';
import { Search, MapPin, Briefcase, GraduationCap } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilterChange }) => {
  const [filters, setFilters] = React.useState({
    location: '',
    specialization: '',
    experience: '',
  });

  const handleFilterChange = (name: string, value: string) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-4 py-4 border-none rounded-2xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-base transition-all shadow-xl shadow-slate-200/50"
          placeholder="Search by dentist name..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-4 w-4 text-slate-400" />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-3 bg-white border-none rounded-xl text-sm text-slate-600 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm appearance-none cursor-pointer"
            onChange={(e) => handleFilterChange('location', e.target.value)}
          >
            <option value="">All Locations</option>
            <option value="Downtown">Downtown</option>
            <option value="Northside">Northside</option>
            <option value="West End">West End</option>
            <option value="Southside">Southside</option>
          </select>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <GraduationCap className="h-4 w-4 text-slate-400" />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-3 bg-white border-none rounded-xl text-sm text-slate-600 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm appearance-none cursor-pointer"
            onChange={(e) => handleFilterChange('specialization', e.target.value)}
          >
            <option value="">All Specializations</option>
            <option value="Orthodontist">Orthodontist</option>
            <option value="Periodontist">Periodontist</option>
            <option value="General Dentist">General Dentist</option>
            <option value="Oral Surgeon">Oral Surgeon</option>
          </select>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Briefcase className="h-4 w-4 text-slate-400" />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-3 bg-white border-none rounded-xl text-sm text-slate-600 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm appearance-none cursor-pointer"
            onChange={(e) => handleFilterChange('experience', e.target.value)}
          >
            <option value="">Any Experience</option>
            <option value="0-5">0-5 Years</option>
            <option value="5-10">5-10 Years</option>
            <option value="10+">10+ Years</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
