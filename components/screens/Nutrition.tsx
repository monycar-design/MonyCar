import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Card from '../ui/Card';
import { MealType, Emotion } from '../../types';
import { MEAL_EXAMPLES } from '../../constants';

const Nutrition: React.FC = () => {
    const { logMeal, workShift, mealLogs, fastingHours, setFastingHours } = useAppContext();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [mealTime, setMealTime] = useState(`${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`);
    const [mealType, setMealType] = useState<MealType>(MealType.Comida);
    const [foods, setFoods] = useState('');
    const [emotion, setEmotion] = useState<Emotion>(Emotion.HambreReal);
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
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (foods.trim() === '') return;
        
        const mealDateTime = new Date(`${selectedDate}T${mealTime}`).toISOString();
        
        logMeal({ date: mealDateTime, mealType, foods, emotion, photo });
        setFoods('');
        setPhoto(undefined);
        setMealType(MealType.Comida);
        
        // Clear file input
        const fileInput = document.getElementById('meal-photo-input') as HTMLInputElement;
        if(fileInput) fileInput.value = '';
    };

    const handleFastingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFastingHours(parseInt(e.target.value, 10));
    };
    
    const logsForSelectedDate = mealLogs.filter(log => new Date(log.date).toISOString().split('T')[0] === selectedDate);
    const selectedDateDisplay = new Date(selectedDate + 'T00:00:00Z').toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });


    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary-dark">Registro de Nutrición</h1>
            
            <Card title="Registrar Comida">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-textSecondary">Fecha</label>
                             <input 
                                type="date" 
                                value={selectedDate} 
                                onChange={e => setSelectedDate(e.target.value)}
                                max={new Date().toISOString().split('T')[0]} // Prevent future dates
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-textSecondary">Hora</label>
                             <input 
                                type="time" 
                                value={mealTime} 
                                onChange={e => setMealTime(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-textSecondary">Tipo de Comida</label>
                        <select value={mealType} onChange={e => setMealType(e.target.value as MealType)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                            {Object.values(MealType).map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-textSecondary">Alimentos y porciones</label>
                        <textarea value={foods} onChange={e => setFoods(e.target.value)} rows={3} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" placeholder="Ej: 150g pollo, 1 taza brócoli, 1/2 taza quinoa"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-textSecondary">¿Por qué comiste?</label>
                        <select value={emotion} onChange={e => setEmotion(e.target.value as Emotion)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                           {Object.values(Emotion).map(emo => <option key={emo} value={emo}>{emo}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-textSecondary">Foto del plato (opcional)</label>
                        <input id="meal-photo-input" type="file" accept="image/*" onChange={handlePhotoChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-white hover:file:bg-primary"/>
                        {photo && <img src={photo} alt="Vista previa del plato" className="mt-2 rounded-lg max-h-48"/>}
                    </div>
                    <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300">Añadir Comida (+5 pts)</button>
                </form>
            </Card>

            <Card title="Ajustar Ventana de Ayuno">
                <div className="space-y-2">
                    <label htmlFor="fasting-hours" className="block text-sm font-medium text-textSecondary">
                        Selecciona tu objetivo de ayuno intermitente. El contador comenzará después de tu última comida registrada.
                    </label>
                    <select 
                        id="fasting-hours"
                        value={fastingHours} 
                        onChange={handleFastingChange} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    >
                        <option value={14}>14 horas (Ayuno 14:10)</option>
                        <option value={16}>16 horas (Ayuno 16:8)</option>
                        <option value={18}>18 horas (Ayuno 18:6)</option>
                        <option value={20}>20 horas (Ayuno 20:4)</option>
                    </select>
                </div>
            </Card>

            <Card title={`Ejemplos de Comidas (Turno ${workShift})`}>
                <div className="space-y-2 text-sm">
                    <p><strong>Desayuno:</strong> {MEAL_EXAMPLES[workShift].Desayuno}</p>
                    <p><strong>Comida:</strong> {MEAL_EXAMPLES[workShift].Comida}</p>
                    <p><strong>Cena:</strong> {MEAL_EXAMPLES[workShift].Cena}</p>
                </div>
            </Card>
            
            <Card title="Recordatorios">
                <ul className="list-disc list-inside space-y-2 text-calm">
                    <li>Beber 2-3 litros de agua al día.</li>
                    <li>Evitar refrescos y bebidas azucaradas.</li>
                    <li>Limitar el alcohol a ocasiones especiales.</li>
                    <li>Regla del plato: ½ verduras, ¼ proteína, ¼ carbohidratos.</li>
                </ul>
            </Card>
            
            <Card title={`Comidas Registradas el ${selectedDateDisplay}`}>
                {logsForSelectedDate.length > 0 ? (
                    <ul className="space-y-3">
                        {logsForSelectedDate.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(log => (
                            <li key={log.id} className="p-3 bg-gray-50 rounded-md border">
                                <p className="font-bold">{log.mealType} <span className="text-xs font-normal text-gray-500">({new Date(log.date).toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})})</span></p>
                                <p className="text-sm text-gray-700">{log.foods}</p>
                                <p className="text-xs text-gray-500">Motivo: {log.emotion}</p>
                                {log.photo && <img src={log.photo} alt="Plato" className="mt-2 rounded-lg max-h-32"/>}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-textSecondary">No has registrado ninguna comida en esta fecha.</p>
                )}
            </Card>
        </div>
    );
};

export default Nutrition;