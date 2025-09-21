
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavIcon = ({ children }: { children: React.ReactNode }) => (
    <div className="flex justify-center items-center w-8 h-8">{children}</div>
);

const BottomNav: React.FC = () => {
    const navItems = [
        { path: '/dashboard', label: 'Inicio', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
        { path: '/nutricion', label: 'Nutrición', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg> },
        { path: '/ejercicio', label: 'Ejercicio', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
        { path: '/sueno', label: 'Sueño', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg> },
        { path: '/progreso', label: 'Progreso', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
    ];
    
    const activeLink = "text-primary-dark";
    const inactiveLink = "text-textSecondary hover:text-primary-light";

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-surface shadow-lg max-w-lg mx-auto border-t border-gray-200">
            <div className="flex justify-around">
                {navItems.map(item => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `${isActive ? activeLink : inactiveLink} flex flex-col items-center justify-center w-full pt-2 pb-1 text-xs`}
                    >
                        <NavIcon>{item.icon}</NavIcon>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default BottomNav;
