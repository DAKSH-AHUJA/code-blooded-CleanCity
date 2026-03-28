import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Switch from '../DarkModeToggle';
import logo from '../assets/logoo.svg';
import { Info, Phone, Menu, X, AlertTriangle, Map, FileText } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { title: 'Report Issue', href: '/report-issue', icon: FileText },
    { title: 'About', href: '/about', icon: Info },
    { title: 'Contact Us', href: '/contact', icon: Phone },
    { title: 'Issue Map', href: '/user-map', icon: Map },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-green-100 dark:border-green-900/20 shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-3 group">
            <img src={logo} alt="EcoSync logo" className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" />
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((navItem) => {
              const Icon = navItem.icon;
              const isActive = location.pathname === navItem.href;
              return (
                <Link
                  key={navItem.title}
                  to={navItem.href}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'text-green-700 dark:text-green-300 bg-white/60 dark:bg-white/10 border border-green-200/50 dark:border-green-700/50'
                      : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{navItem.title}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => navigate('/sos')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>SOS</span>
            </button>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950/50">
              <Switch />
            </div>
          </div>

          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950/50"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-green-600 dark:text-green-400" /> : <Menu className="h-5 w-5 text-green-600 dark:text-green-400" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white dark:bg-slate-950 pt-20 px-6 pb-6">
          <button
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-green-50 dark:bg-green-950/50"
            aria-label="Close navigation menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-5 h-5 text-green-600 dark:text-green-400" />
          </button>

          <div className="space-y-3">
            {navLinks.map((navItem) => {
              const Icon = navItem.icon;
              return (
                <Link
                  key={navItem.title}
                  to={navItem.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-4 text-lg font-medium rounded-xl text-gray-700 dark:text-gray-300 bg-green-50 dark:bg-green-950/50"
                >
                  <Icon className="w-5 h-5" />
                  <span>{navItem.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
