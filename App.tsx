
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/screens/Dashboard';
import Nutrition from './components/screens/Nutrition';
import Exercise from './components/screens/Exercise';
import Sleep from './components/screens/Sleep';
import Cbt from './components/screens/Cbt';
import Progress from './components/screens/Progress';
import BottomNav from './components/ui/BottomNav';

const App: React.FC = () => {
    return (
        <HashRouter>
            <div className="min-h-screen bg-background font-sans text-textPrimary">
                <div className="container mx-auto max-w-lg pb-24">
                    <main className="p-4">
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/nutricion" element={<Nutrition />} />
                            <Route path="/ejercicio" element={<Exercise />} />
                            <Route path="/sueno" element={<Sleep />} />
                            <Route path="/cbt" element={<Cbt />} />
                            <Route path="/progreso" element={<Progress />} />
                            <Route path="*" element={<Navigate to="/dashboard" />} />
                        </Routes>
                    </main>
                    <BottomNav />
                </div>
            </div>
        </HashRouter>
    );
};

export default App;
