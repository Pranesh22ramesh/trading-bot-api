import React, { useState } from 'react';
import { X, Mail, Lock, Loader2 } from 'lucide-react';
import { authService } from '../services/api';

const Auth = ({ isOpen, onClose, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { data } = await authService.login(email, password);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        onClose();
      } else {
        await authService.register(email, password);
        setIsLogin(true);
        setError('Registered successfully! Please login.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="glass w-full max-w-md p-8 relative fade-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold mb-2">{isLogin ? 'Welcome Back' : 'Join Us'}</h2>
        <p className="text-slate-400 mb-8">{isLogin ? 'Admin access to manage schools.' : 'Create an admin account.'}</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="admin@schoolsphere.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button disabled={loading} type="submit" className="btn btn-primary w-full justify-center py-3">
            {loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-400 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-indigo-400 font-semibold hover:underline"
          >
            {isLogin ? 'Create one' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
