import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Check, Loader2, MapPin, Navigation } from 'lucide-react';
import { schoolService } from '../services/api';

const AdminDashboard = ({ schools, refreshSchools }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await schoolService.updateSchool(editingId, formData);
      } else {
        await schoolService.addSchool(formData);
      }
      setIsAdding(false);
      setEditingId(null);
      setFormData({ name: '', address: '', latitude: '', longitude: '' });
      refreshSchools();
    } catch (err) {
      alert('Operation failed. Please check your data.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this school?')) {
      try {
        await schoolService.deleteSchool(id);
        refreshSchools();
      } catch (err) {
        alert('Delete failed.');
      }
    }
  };

  const startEdit = (school) => {
    setFormData({
      name: school.name,
      address: school.address,
      latitude: school.latitude,
      longitude: school.longitude
    });
    setEditingId(school.id);
    setIsAdding(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Schools</h2>
        <button onClick={() => setIsAdding(!isAdding)} className="btn btn-primary">
          {isAdding ? <X size={18} /> : <Plus size={18} />}
          <span>{isAdding ? 'Cancel' : 'Add School'}</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="glass p-6 space-y-4 fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">School Name</label>
              <input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 focus:outline-none focus:border-indigo-500"
                placeholder="Greenwood High"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Address</label>
              <input
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 focus:outline-none focus:border-indigo-500"
                placeholder="123 Education St, NY"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Latitude</label>
              <input
                required
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 focus:outline-none focus:border-indigo-500"
                placeholder="40.7128"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Longitude</label>
              <input
                required
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 focus:outline-none focus:border-indigo-500"
                placeholder="-74.0060"
              />
            </div>
          </div>
          <button disabled={loading} className="btn btn-primary w-full justify-center">
            {loading ? <Loader2 className="animate-spin" /> : <Check size={18} />}
            <span>{editingId ? 'Update School' : 'Save School'}</span>
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {schools.map((school) => (
          <div key={school.id} className="glass p-4 group hover:border-indigo-500/50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg truncate pr-4">{school.name}</h3>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => startEdit(school)} className="text-slate-400 hover:text-indigo-400">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(school.id)} className="text-slate-400 hover:text-red-400">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="text-slate-400 text-sm space-y-2">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-indigo-400" />
                <span className="truncate">{school.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Navigation size={14} className="text-cyan-400" />
                <span>{school.latitude}, {school.longitude}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
