import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SchoolMap from './components/SchoolMap';
import Auth from './components/Auth';
import AdminDashboard from './components/AdminDashboard';
import { schoolService } from './services/api';
import { Search, Map as MapIcon, List as ListIcon, MapPin, Compass } from 'lucide-react';
import heroImage from './assets/hero.png';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [schools, setSchools] = useState([]);
  const [view, setView] = useState('map'); // 'map' or 'admin'
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [userLoc, setUserLoc] = useState({ latitude: 28.6139, longitude: 77.2090 }); // Default Delhi

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLoc({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
      });
    }
  }, []);

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const { data } = await schoolService.getSchools(userLoc.latitude, userLoc.longitude, search);
      setSchools(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, [userLoc, search]);

  return (
    <div className="min-h-screen pb-20">
      <Navbar user={user} setUser={setUser} onAuthClick={() => setIsAuthOpen(true)} />
      <Auth isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} setUser={setUser} />

      <main className="max-w-7xl mx-auto px-4 space-y-8 mt-8">
        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden glass p-12 text-center space-y-6 fade-in">
          <div className="absolute inset-0 z-0 opacity-20">
            <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              Discover Your <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Future School</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
              Explore high-quality educational institutions near you with our real-time proximity-based school management platform.
            </p>
          </div>
        </section>

        {/* View Switcher & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="glass p-1 flex gap-1">
            <button
              onClick={() => setView('map')}
              className={`btn ${view === 'map' ? 'btn-primary' : 'btn-outline border-none'}`}
            >
              <MapIcon size={18} />
              <span>Map View</span>
            </button>
            {user && (
              <button
                onClick={() => setView('admin')}
                className={`btn ${view === 'admin' ? 'btn-primary' : 'btn-outline border-none'}`}
              >
                <Compass size={18} />
                <span>Manage Schools</span>
              </button>
            )}
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3 text-slate-500" size={20} />
            <input
              type="text"
              placeholder="Search by school name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full glass bg-transparent border-none py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>
        </div>

        {/* Main Content Area */}
        {view === 'map' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
            <div className="lg:col-span-2">
              <SchoolMap schools={schools} userLocation={userLoc} />
            </div>
            <div className="glass overflow-y-auto p-6 space-y-4 hidden lg:block">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ListIcon size={20} className="text-indigo-400" />
                Schools Nearby
              </h3>
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : schools.map((school) => (
                <div key={school.id} className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                  <h4 className="font-semibold text-slate-200">{school.name}</h4>
                  <p className="text-sm text-slate-500 mb-2 truncate">{school.address}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-indigo-400 font-medium">{school.distance_km} km away</span>
                    <button className="text-slate-400 hover:text-white transition-colors">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <AdminDashboard schools={schools} refreshSchools={fetchSchools} />
        )}
      </main>

      <footer className="mt-20 py-10 border-t border-slate-800 text-center text-slate-500">
        <p>© 2024 SchoolSphere Management. Built for the future of education.</p>
      </footer>
    </div>
  );
}

export default App;
