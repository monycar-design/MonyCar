import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import WeightChart from '../ui/WeightChart';

// Mock service for motivational phrases
const motivationalPhrases = [
    "¡Hoy es un día menos para marzo, hazlo contar!",
    "Cada paso que das te acerca a tu meta. ¡Sigue adelante!",
    "La disciplina es el puente entre tus metas y tus logros.",
    "No te rindas, el principio es siempre lo más difícil.",
    "¡Imagina tu éxito y trabaja por él cada día!",
];

const getMotivationalPhrase = async (): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * motivationalPhrases.length);
            resolve(motivationalPhrases[randomIndex]);
        }, 200);
    });
};


const Dashboard: React.FC = () => {
    const { 
        currentWeight, 
        targetWeight, 
        initialWeight, 
        intermediateGoalWeight, 
        mainMotivation,
        mainMotivationPhoto,
        setMainMotivation,
        points,
        level,
        weightHistory,
        lastMealTime,
        fastingHours
    } = useAppContext();
    
    const [motivation, setMotivation] = useState("Cargando motivación...");
    const [motivationText, setMotivationText] = useState(mainMotivation);
    const [newMotivationPhoto, setNewMotivationPhoto] = useState<string | undefined>(mainMotivationPhoto);
    const [now, setNow] = useState(new Date());

     useEffect(() => {
        getMotivationalPhrase().then(setMotivation);
        
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setNewMotivationPhoto(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleMotivationSave = () => {
        setMainMotivation(motivationText, newMotivationPhoto);
        alert('Motivación guardada.');
    };

    const kilosLeft = currentWeight - targetWeight;
    const totalLossGoal = initialWeight - targetWeight;
    const progressPercentage = totalLossGoal > 0 ? ((initialWeight - currentWeight) / totalLossGoal) * 100 : 0;

    const renderFastingTracker = () => {
        if (!lastMealTime) {
            return (
                <Card title="Seguimiento de Ayuno">
                    <p className="text-textSecondary text-center">Registra tu primera comida para comenzar el seguimiento del ayuno.</p>
                </Card>
            );
        }

        const fastStartTime = lastMealTime;
        const fastEndTime = new Date(fastStartTime.getTime() + fastingHours * 60 * 60 * 1000);
        const totalFastDurationMs = fastingHours * 60 * 60 * 1000;
        
        const elapsedTimeMs = now.getTime() - fastStartTime.getTime();
        const remainingTimeMs = fastEndTime.getTime() - now.getTime();
        
        const isFasting = now < fastEndTime;

        const fastingProgressPercentage = Math.min((elapsedTimeMs / totalFastDurationMs) * 100, 100);

        const formatTime = (ms: number) => {
            if (ms < 0) return '00:00:00';
            const totalSeconds = Math.floor(ms / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            const zeroPad = (num: number) => String(num).padStart(2, '0');
            return `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`;
        };

        return (
            <Card title="Seguimiento de Ayuno">
                <div className="space-y-4">
                    <div className="text-center">
                        <p className={`text-2xl font-bold ${isFasting ? 'text-calm' : 'text-progress'}`}>
                            {isFasting ? 'Ayunando' : 'Ventana de Comida'}
                        </p>
                        <p className="text-sm text-textSecondary">
                            Tu objetivo: {fastingHours} horas de ayuno.
                        </p>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                            className={`h-4 rounded-full transition-all duration-500 ${isFasting ? 'bg-calm' : 'bg-progress'}`}
                            style={{ width: `${isFasting ? fastingProgressPercentage : 100}%` }}
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-sm text-textSecondary">Tiempo Transcurrido</p>
                            <p className="font-mono text-xl font-semibold">{formatTime(elapsedTimeMs)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-textSecondary">Tiempo Restante</p>
                            <p className="font-mono text-xl font-semibold">{formatTime(remainingTimeMs)}</p>
                        </div>
                    </div>

                    <div className="text-center text-sm text-textSecondary border-t pt-2 mt-2">
                        <p>Fin del ayuno: {fastEndTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                </div>
            </Card>
        );
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary-dark">Panel de Carlos</h1>
            <Card className="bg-gradient-to-r from-primary to-secondary text-white">
                <p className="text-center text-lg italic">"{motivation}"</p>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                <Card className="text-center">
                    <p className="text-sm text-textSecondary">Peso Actual</p>
                    <p className="text-3xl font-bold">{currentWeight.toFixed(1)} kg</p>
                </Card>
                <Card className="text-center">
                    <p className="text-sm text-textSecondary">Kilos Restantes</p>
                    <p className="text-3xl font-bold text-progress">{kilosLeft.toFixed(1)} kg</p>
                </Card>
            </div>
            
            <Card title="Progreso General">
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                        className="bg-progress h-4 rounded-full text-center text-white text-xs flex items-center justify-center" 
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    >
                       {progressPercentage > 10 && `${progressPercentage.toFixed(0)}%`}
                    </div>
                </div>
                <div className="flex justify-between text-sm mt-2">
                    <span>{initialWeight} kg</span>
                    <span>{targetWeight} kg</span>
                </div>
            </Card>

            {renderFastingTracker()}

            <div className="grid grid-cols-2 gap-4">
                <Card className="text-center">
                    <p className="text-sm text-textSecondary">Meta Intermedia</p>
                    <p className="text-xl font-bold">{intermediateGoalWeight} kg</p>
                </Card>
                <Badge level={level} points={points} />
            </Card>
            
            <Card title="Gráfico de Peso Semanal">
                 <WeightChart data={weightHistory.slice(-7)} targetWeight={targetWeight} intermediateGoalWeight={intermediateGoalWeight} />
            </Card>

            <Card title="Tu Motivación Principal">
                 <div className="space-y-4">
                    {(mainMotivationPhoto || newMotivationPhoto) && <img src={newMotivationPhoto || mainMotivationPhoto} alt="Motivación" className="rounded-lg w-full object-cover max-h-48"/>}
                    <textarea 
                        className="w-full p-2 border rounded-md"
                        value={motivationText}
                        onChange={(e) => setMotivationText(e.target.value)}
                        rows={2}
                        placeholder="Escribe aquí tu motivación principal..."
                    />
                    <div>
                        <label className="block text-sm font-medium text-textSecondary">Cambiar/Añadir foto</label>
                        <input type="file" accept="image/*" onChange={handlePhotoChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-motivation/20 file:text-motivation hover:file:bg-motivation/30"/>
                    </div>
                    <button onClick={handleMotivationSave} className="w-full bg-motivation text-white py-2 px-4 rounded-md hover:opacity-90 transition duration-300">
                        Guardar Motivación
                    </button>
                </div>
            </Card>

        </div>
    );
};

export default Dashboard;
