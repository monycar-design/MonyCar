
import React from 'react';

interface BadgeProps {
    level: 'Bronce' | 'Plata' | 'Oro';
    points: number;
}

const Badge: React.FC<BadgeProps> = ({ level, points }) => {
    const levelColors = {
        Bronce: { bg: 'bg-yellow-600', text: 'text-white' },
        Plata: { bg: 'bg-gray-400', text: 'text-white' },
        Oro: { bg: 'bg-yellow-400', text: 'text-yellow-900' },
    };

    const { bg, text } = levelColors[level];

    return (
        <div className={`flex items-center space-x-3 p-3 rounded-lg ${bg} ${text} shadow-lg`}>
            <div className="text-2xl">
                {level === 'Bronce' && '🥉'}
                {level === 'Plata' && '🥈'}
                {level === 'Oro' && '🥇'}
            </div>
            <div>
                <div className="font-bold text-lg">Nivel {level}</div>
                <div className="text-sm">{points} Puntos</div>
            </div>
        </div>
    );
};

export default Badge;
