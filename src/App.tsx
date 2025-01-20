import React from 'react';
import { useAuth } from './contexts/AuthContext';
import { Auth } from './components/Auth';
import { BayManagement } from './components/BayManagement';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return <BayManagement />;
}

export default App;