import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Card from '../ui/Card';
import WeightChart from '../ui/WeightChart';

const Progress: React.FC = () => {
    const { 
        weightHistory, 
        targetWeight, 
        intermediateGoalWeight, 
        initialWeight,
        logWeight
    } = useAppContext();
    
    const [note, setNote] = useState('Esta semana sumo salud');
    const [newWeight, setNewWeight] = useState(weightHistory[weightHistory.length - 1].weight);
    const [photo, setPhoto] = useState<string | undefined>(undefined);
    
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPhoto(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleWeighIn = (e: React.FormEvent) => {
        e.preventDefault();
        logWeight(newWeight, note, photo);
        setPhoto(undefined);
        const fileInput = document.getElementById('progress-photo-input') as HTMLInputElement;
        if(fileInput) fileInput.value = '';
        alert('¡Peso registrado! Sigue así.');
    };
    
    const totalLost = initialWeight - weightHistory[weightHistory.length - 1].weight;
    const totalGoal = initialWeight - targetWeight;
    const percentageComplete = totalGoal > 0 ? (totalLost / totalGoal) * 100 : 0;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary-dark">Tu Progreso</h1>
            
            <Card title="Registro Semanal (Lunes)">
                <form onSubmit={handleWeighIn} className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-textSecondary">Tu peso de hoy (kg)</label>
                        <input type="number" step="0.1" value={newWeight} onChange={e => setNewWeight(parseFloat(e.target.value))} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-textSecondary">Frase motivacional</label>
                        <input type="text" value={note} onChange={e => setNote(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-textSecondary">Foto de progreso (opcional)</label>
                        <input id="progress-photo-input" type="file" accept="image/*" onChange={handlePhotoChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-white hover:file:bg-primary"/>
                        {photo && <img src={photo} alt="Vista previa" className="mt-2 rounded-lg max-h-48 w-full object-contain"/>}
                    </div>
                    <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300">Registrar Peso</button>
                </form>
            </Card>
            
            <Card title="Gráfico de Progreso Total">
                <WeightChart 
                    data={weightHistory} 
                    targetWeight={targetWeight} 
                    intermediateGoalWeight={intermediateGoalWeight} 
                />
            </Card>
            
            <Card title="Reporte Mensual">
                <div className="space-y-3 text-center">
                    <div>
                        <p className="text-textSecondary">Kilos perdidos en total</p>
                        <p className="text-2xl font-bold text-progress">{totalLost.toFixed(1)} kg</p>
                    </div>
                    <div>
                        <p className="text-textSecondary">Porcentaje de la meta completado</p>
                        <p className="text-2xl font-bold text-progress">{percentageComplete.toFixed(1)} %</p>
                    </div>
                </div>
            </Card>
            
             <Card title="Historial de Pesajes">
                <ul className="max-h-80 overflow-y-auto space-y-2">
                    {[...weightHistory].reverse().map(entry => (
                        <li key={entry.date} className="p-2 border rounded-md">
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <p className="font-semibold">{new Date(entry.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p className="text-xl font-bold">{entry.weight} kg</p>
                                    {entry.note && <p className="text-xs text-gray-500 italic mt-1">"{entry.note}"</p>}
                                </div>
                                {entry.photo && (
                                    <img src={entry.photo} alt={`Progreso ${entry.date}`} className="w-20 h-20 rounded-md object-cover flex-shrink-0"/>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
};

export default Progress;