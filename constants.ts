import type { AppState, Workout } from './types';

export const INITIAL_STATE: AppState = {
    initialWeight: 119,
    targetWeight: 84,
    intermediateGoalWeight: 105,
    targetDate: '2026-03-01',
    intermediateGoalDate: '2025-12-01',
    mainMotivation: 'Salud y apariencia para marzo',
    mainMotivationPhoto: undefined,
    workShift: 'Diurno',
    weightHistory: [
        { date: new Date().toISOString().split('T')[0], weight: 119, note: "Peso inicial" },
    ],
    mealLogs: [],
    completedWorkouts: [],
    sleepLogs: [],
    cbtLogs: [],
    fastingHours: 16,
};

export const WEEKLY_WORKOUTS: Workout[] = [
    { id: 'f1', day: 'Lunes', type: 'Fuerza', description: 'Piernas y abdomen (Sentadillas, zancadas, prensa, elevación de talones, planchas)', duration: 45 },
    { id: 'c1', day: 'Martes', type: 'Cardio', description: 'Caminata rápida o elíptica', duration: 30 },
    { id: 'f2', day: 'Miércoles', type: 'Fuerza', description: 'Pecho y espalda (Press de banca en máquina, remo en máquina, jalón al pecho). ⚠️ Cuidado con el hombro.', duration: 45 },
    { id: 'c2', day: 'Jueves', type: 'Cardio', description: 'Bicicleta estática', duration: 30 },
    { id: 'f3', day: 'Viernes', type: 'Fuerza', description: 'Full body con enfoque en core (Peso muerto rumano, press militar con mancuernas ligeras, remo, planchas laterales)', duration: 45 },
    { id: 'c3', day: 'Sábado', type: 'Cardio', description: 'Caminata larga al aire libre', duration: 40 },
    { id: 'c4', day: 'Domingo', type: 'Cardio', description: 'Descanso activo o caminata suave', duration: 20 },
];

export const MEAL_EXAMPLES = {
    Diurno: {
        Desayuno: "Avena con fruta y nueces",
        Comida: "Pechuga de pollo a la plancha con quinoa y ensalada grande",
        Cena: "Salmón al horno con brócoli y espárragos",
    },
    Vespertino: {
        Desayuno: "Yogur griego con bayas",
        Comida: "Lentejas con verduras y arroz integral",
        Cena: "Ensalada de atún con huevo duro y aguacate",
    },
    Nocturno: {
        Desayuno: "Batido de proteína con espinacas y plátano (antes de dormir)",
        Comida: "Pavo molido con batata y judías verdes (al despertar)",
        Cena: "Tofu salteado con pimientos y cebolla (mitad de turno)",
    }
}

export const CBT_REWARDS = [
    "Ropa nueva",
    "Noche de cine",
    "Una cita especial",
    "Un masaje relajante",
    "Comprar un libro o videojuego",
    "Un día de excursión"
];
