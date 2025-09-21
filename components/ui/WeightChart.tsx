
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import type { WeightEntry } from '../../types';

interface WeightChartProps {
    data: WeightEntry[];
    targetWeight: number;
    intermediateGoalWeight: number;
}

const WeightChart: React.FC<WeightChartProps> = ({ data, targetWeight, intermediateGoalWeight }) => {
    const chartData = data.map(entry => ({
        ...entry,
        date: new Date(entry.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })
    }));

    return (
        <div className="w-full h-64">
            <ResponsiveContainer>
                <LineChart
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 20,
                        left: -10,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="weight" name="Peso (kg)" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <ReferenceLine y={targetWeight} label="Meta Final" stroke="green" strokeDasharray="3 3" />
                    <ReferenceLine y={intermediateGoalWeight} label="Meta Intermedia" stroke="orange" strokeDasharray="3 3" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeightChart;
