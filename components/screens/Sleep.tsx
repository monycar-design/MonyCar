
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import Card from '../ui/Card';

const Sleep: React.FC = () => {
    const { logSleep, sleepLogs } = useAppContext();
    const [hours, setHours] = useState(7);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        logSleep(hours);
    };
    
    const last7DaysLogs = useMemo(() => {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return sleepLogs.filter(log => new Date(log.date) >= sevenDaysAgo);
    }, [sleepLogs]);

    const weeklyAverage = useMemo(() => {
        if (last7DaysLogs.length === 0) return 0;
        const totalHours = last7DaysLogs.reduce((acc, log) => acc + log.hours, 0);
        return totalHours / last7DaysLogs.length;
    }, [last7DaysLogs]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary-dark">Registro de Sueño</h1>
            
            <Card title="Registrar Horas de Sueño de Anoche">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center justify-center space-x-4">
                        <button type="button" onClick={() => setHours(h => Math.max(0, h - 0.5))} className="bg-gray-200 h-10 w-10 rounded-full font-bold text-xl">-</button>
                        <span className="text-3xl font-bold w-24 text-center">{hours.toFixed(1)}</span>
                        <button type="button" onClick={() => setHours(h => h + 0.5)} className="bg-gray-200 h-10 w-10 rounded-full font-bold text-xl">+</button>
                    </div>
                    <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300">Guardar Sueño (+5 pts si > 6h)</button>
                </form>
            </Card>

            <Card title="Estadísticas de Sueño (Últimos 7 días)">
                <div className="text-center">
                    <p className="text-textSecondary">Promedio Semanal</p>
                    <p className={`text-3xl font-bold ${weeklyAverage < 6 ? 'text-red-500' : 'text-progress'}`}>
                        {weeklyAverage.toFixed(1)} horas
                    </p>
                    {weeklyAverage < 6 && weeklyAverage > 0 && <p className="text-red-500 text-sm mt-2">Alerta: Tu promedio es menor a 6 horas.</p>}
                </div>
            </Card>
            
            <Card title="Consejos de Higiene del Sueño">
                <ul className="list-disc list-inside space-y-2 text-calm">
                    <li>Evita pantallas (móvil, TV) al menos 1 hora antes de dormir.</li>
                    <li>Mantén tu habitación oscura, silenciosa y fresca.</li>
                    <li>Intenta acostarte y levantarte a la misma hora todos los días.</li>
                    <li>Practica técnicas de relajación como la respiración profunda.</li>
                </ul>
            </Card>
        </div>
    );
};

export default Sleep;
