
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Card from '../ui/Card';
import { CBT_REWARDS } from '../../constants';

const Cbt: React.FC = () => {
    const { logCbt } = useAppContext();
    const [sabotage, setSabotage] = useState('');
    const [rational, setRational] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (sabotage.trim() && rational.trim()) {
            logCbt(sabotage, rational);
            setSabotage('');
            setRational('');
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary-dark">Estrategias Cognitivas</h1>
            
            <Card title="Registro de Pensamientos">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-textSecondary">"Frase de Sabotaje"</label>
                        <input type="text" value={sabotage} onChange={e => setSabotage(e.target.value)} placeholder="Ej: 'Ya fallé, da igual lo que coma ahora'" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-textSecondary">Respuesta Racional</label>
                        <input type="text" value={rational} onChange={e => setRational(e.target.value)} placeholder="Ej: 'Una comida no arruina la semana'" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300">Registrar Pensamiento</button>
                </form>
            </Card>
            
            <Card title="Visualización Motivacional Diaria">
                <div className="p-4 border-2 border-dashed border-motivation rounded-lg text-center">
                    <img src="https://picsum.photos/400/200" alt="Motivación" className="rounded-lg mb-4"/>
                    <p className="text-lg font-semibold text-motivation">"Imagínate en marzo con 84 kg, sintiéndote increíble."</p>
                </div>
            </Card>

            <Card title="Lista de Recompensas (No Comida)">
                 <ul className="grid grid-cols-2 gap-2">
                    {CBT_REWARDS.map(reward => (
                       <li key={reward} className="bg-gray-100 p-2 rounded-md text-center text-sm">{reward}</li>
                    ))}
                </ul>
            </Card>
        </div>
    );
};

export default Cbt;
