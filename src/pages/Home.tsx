import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDentists } from '../services/api';
import DentistList from '../components/DentistList';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import { ShieldCheck, CalendarCheck, Headphones, Zap } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [dentists, setDentists] = useState([]);
  const [filteredDentists, setFilteredDentists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    location: '',
    specialization: '',
    experience: '',
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const dentistsPerPage = 6;

  useEffect(() => {
    const fetchDentists = async () => {
      console.log("fetchDentists started");
      try {
        const data = await getDentists();
        console.log("fetchDentists success", data);
        setDentists(data);
        setFilteredDentists(data);
      } catch (err) {
        console.error("fetchDentists error", err);
        setError('Failed to load dentists. Please try again later.');
      } finally {
        console.log("fetchDentists finally");
        setLoading(false);
      }
    };

    fetchDentists();
  }, []);

  useEffect(() => {
    let result = dentists;

    // Search query with basic validation
    if (searchQuery.trim()) {
      result = result.filter((d: any) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Location filter
    if (activeFilters.location && activeFilters.location !== 'All') {
      result = result.filter((d: any) => d.location === activeFilters.location);
    }

    // Specialization filter
    if (activeFilters.specialization && activeFilters.specialization !== 'All') {
      result = result.filter((d: any) => d.specialization === activeFilters.specialization);
    }

    // Experience filter
    if (activeFilters.experience) {
      result = result.filter((d: any) => {
        const years = parseInt(d.experience);
        if (activeFilters.experience === '0-5') return years <= 5;
        if (activeFilters.experience === '5-10') return years > 5 && years <= 10;
        if (activeFilters.experience === '10+') return years > 10;
        return true;
      });
    }

    setFilteredDentists(result);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchQuery, activeFilters, dentists]);

  // Pagination logic
  const indexOfLast = currentPage * dentistsPerPage;
  const indexOfFirst = indexOfLast - dentistsPerPage;
  const currentDentists = filteredDentists.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredDentists.length / dentistsPerPage);

  const handleGetStarted = () => {
    navigate("/login");
  };

  const handleLearnMore = () => {
    document.getElementById("about-us")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-100 to-blue-200">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">
          Find Your Perfect Dentist
        </h1>

        <p className="text-lg mb-6 text-slate-700">
          Book appointments with trusted professionals near you. <br />
          Professional care for your smile, simplified.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleGetStarted}
            className="bg-green-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors"
          >
            Get Started Now
          </button>

          <button
            onClick={handleLearnMore}
            className="bg-white border border-slate-200 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-900">About Us</h2>

        <p className="max-w-2xl mx-auto text-slate-600 leading-relaxed">
          We connect patients with trusted dental professionals, making it easy to
          find, compare, and book appointments. Our platform ensures quality care,
          transparency, and convenience for every user.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Available Dentists</h1>
          <p className="text-slate-500 font-medium mb-8">Book appointments with top-rated dental professionals.</p>
          
          <SearchBar 
            onSearch={setSearchQuery} 
            onFilterChange={setActiveFilters} 
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader />
            <p className="text-slate-400 mt-4 font-medium animate-pulse">Fetching doctors list...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 font-bold bg-red-50 inline-block px-6 py-3 rounded-2xl border border-red-100">{error}</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">
                {filteredDentists.length} {filteredDentists.length === 1 ? 'Dentist' : 'Dentists'} Found
              </h2>
            </div>
            
            <DentistList dentists={currentDentists} />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-4 pt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  Previous
                </button>
                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl font-bold transition-all ${
                        currentPage === page 
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200' 
                          : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-6 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
