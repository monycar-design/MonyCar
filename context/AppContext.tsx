import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { INITIAL_STATE } from '../constants';
import type { AppState, MealLog, WeightEntry, SleepLog, CbtLog, Emotion, MealType } from '../types';

interface AppContextType extends AppState {
    currentWeight: number;
    points: number;
    level: 'Bronce' | 'Plata' | 'Oro';
    logWeight: (weight: number, note: string, photo?: string) => void;
    logMeal: (meal: Omit<MealLog, 'id'>) => void;
    toggleWorkout: (workoutId: string, date: string) => void;
    logSleep: (hours: number) => void;
    logCbt: (sabotageThought: string, rationalResponse: string) => void;
    setWorkShift: (shift: 'Diurno' | 'Vespertino' | 'Nocturno') => void;
    setMainMotivation: (text: string, photo?: string) => void;
    lastMealTime: Date | null;
    setFastingHours: (hours: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useLocalStorage<AppState>('carlos-app-state', INITIAL_STATE);

    const contextValue = useMemo(() => {
        const currentWeight = state.weightHistory.length > 0 ? state.weightHistory[state.weightHistory.length - 1].weight : state.initialWeight;
        
        const mealPoints = state.mealLogs.length * 5;
        const workoutPoints = state.completedWorkouts.length * 10;
        const sleepPoints = state.sleepLogs.filter(log => log.hours > 6).length * 5;
        const points = mealPoints + workoutPoints + sleepPoints;

        let level: 'Bronce' | 'Plata' | 'Oro' = 'Bronce';
        if (points > 1000) {
            level = 'Oro';
        } else if (points > 500) {
            level = 'Plata';
        }
        
        const sortedMealLogs = state.mealLogs.length > 0 ? [...state.mealLogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [];
        const lastMeal = sortedMealLogs.length > 0 ? sortedMealLogs[0] : null;
        const lastMealTime = lastMeal ? new Date(lastMeal.date) : null;


        const logWeight = (weight: number, note: string, photo?: string) => {
            const newEntry: WeightEntry = { date: new Date().toISOString().split('T')[0], weight, note, photo };
            setState(prev => ({ ...prev, weightHistory: [...prev.weightHistory, newEntry] }));
        };

        const logMeal = (meal: Omit<MealLog, 'id'>) => {
            const newMeal: MealLog = { ...meal, id: new Date().getTime().toString() };
            setState(prev => ({ ...prev, mealLogs: [...prev.mealLogs, newMeal] }));
        };

        const toggleWorkout = (workoutId: string, date: string) => {
            setState(prev => {
                const existing = prev.completedWorkouts.find(w => w.workoutId === workoutId && w.date === date);
                if (existing) {
                    return { ...prev, completedWorkouts: prev.completedWorkouts.filter(w => !(w.workoutId === workoutId && w.date === date)) };
                } else {
                    return { ...prev, completedWorkouts: [...prev.completedWorkouts, { workoutId, date }] };
                }
            });
        };
        
        const logSleep = (hours: number) => {
            const newLog: SleepLog = { id: new Date().getTime().toString(), date: new Date().toISOString().split('T')[0], hours };
            setState(prev => ({ ...prev, sleepLogs: [...prev.sleepLogs, newLog] }));
        };

        const logCbt = (sabotageThought: string, rationalResponse: string) => {
            const newLog: CbtLog = { id: new Date().getTime().toString(), date: new Date().toISOString(), sabotageThought, rationalResponse };
            setState(prev => ({ ...prev, cbtLogs: [...prev.cbtLogs, newLog] }));
        };

        const setWorkShift = (shift: 'Diurno' | 'Vespertino' | 'Nocturno') => {
            setState(prev => ({ ...prev, workShift: shift }));
        };

        const setMainMotivation = (text: string, photo?: string) => {
            setState(prev => {
                const newState = { ...prev, mainMotivation: text };
                if (photo !== undefined) {
                    newState.mainMotivationPhoto = photo;
                }
                return newState;
            });
        };
        
        const setFastingHours = (hours: number) => {
            setState(prev => ({...prev, fastingHours: hours }));
        };

        return { 
            ...state, 
            currentWeight,
            points,
            level,
            logWeight, 
            logMeal, 
            toggleWorkout,
            logSleep,
            logCbt,
            setWorkShift,
            setMainMotivation,
            lastMealTime,
            setFastingHours,
        };
    }, [state, setState]);


    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};