
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Card from '../ui/Card';
import { WEEKLY_WORKOUTS } from '../../constants';

const Exercise: React.FC = () => {
    const { completedWorkouts, toggleWorkout } = useAppContext();
    const today = new Date().toISOString().split('T')[0];
    
    const isCompleted = (workoutId: string) => {
        return completedWorkouts.some(w => w.workoutId === workoutId && w.date === today);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary-dark">Plan de Ejercicio</h1>
            
            <Card title="Rutina Semanal">
                <div className="space-y-4">
                    {WEEKLY_WORKOUTS.map(workout => (
                        <div key={workout.id} className={`p-4 rounded-lg border-l-4 ${isCompleted(workout.id) ? 'bg-green-50 border-progress' : 'bg-white border-primary'}`}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-lg">{workout.day} - {workout.type}</p>
                                    <p className="text-sm text-textSecondary">{workout.description}</p>
                                    <p className="text-sm font-medium text-motivation">{workout.duration} min</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <input 
                                        type="checkbox" 
                                        checked={isCompleted(workout.id)}
                                        onChange={() => toggleWorkout(workout.id, today)}
                                        className="h-6 w-6 rounded text-primary focus:ring-primary-light"
                                    />
                                    <label className="text-xs mt-1">Hecho</label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
            
            <Card title="Notas Importantes">
                <ul className="list-disc list-inside space-y-2 text-calm">
                    <li><strong>Limitación de Hombro:</strong> Prefiere máquinas a peso libre para mayor seguridad en ejercicios de tren superior.</li>
                    <li><strong>Micro-hábitos:</strong> Intenta moverte 10-15 minutos cada día (caminar, estirar). ¡Todo suma!</li>
                    <li>Escucha a tu cuerpo. Si sientes dolor, para y consulta.</li>
                </ul>
            </Card>

        </div>
    );
};

export default Exercise;
