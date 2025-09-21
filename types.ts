export interface WeightEntry {
    date: string; // ISO string
    weight: number; // in kg
    note?: string;
    photo?: string; // base64 string
}

export enum MealType {
    Desayuno = 'Desayuno',
    Comida = 'Comida',
    Cena = 'Cena',
    Snack = 'Snack',
}

export enum Emotion {
    HambreReal = 'Hambre Real',
    Antojo = 'Antojo',
    Estres = 'Estrés',
    Aburrimiento = 'Aburrimiento',
}

export interface MealLog {
    id: string;
    date: string; // ISO string
    mealType: MealType;
    foods: string;
    emotion: Emotion;
    photo?: string; // base64 string
}

export interface Workout {
    id: string;
    day: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
    type: 'Fuerza' | 'Cardio';
    description: string;
    duration: number; // in minutes
}

export interface CompletedWorkout {
    workoutId: string;
    date: string; // ISO string
}

export interface SleepLog {
    id: string;
    date: string; // ISO string
    hours: number;
}

export interface CbtLog {
    id: string;
    date: string; // ISO string
    sabotageThought: string;
    rationalResponse: string;
}

export interface AppState {
    initialWeight: number;
    targetWeight: number;
    intermediateGoalWeight: number;
    targetDate: string;
    intermediateGoalDate: string;
    mainMotivation: string;
    mainMotivationPhoto?: string;
    workShift: 'Diurno' | 'Vespertino' | 'Nocturno';
    weightHistory: WeightEntry[];
    mealLogs: MealLog[];
    completedWorkouts: CompletedWorkout[];
    sleepLogs: SleepLog[];
    cbtLogs: CbtLog[];
    fastingHours: number;
}
