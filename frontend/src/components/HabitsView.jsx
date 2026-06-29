import React from 'react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const HabitsView = ({ habits, setHabits }) => {
    
    const toggleHabit = (habitId, dayIndex) => {
        setHabits(prev => prev.map(h => {
            if (h.id === habitId) {
                const isCompleted = h.completedDays.includes(dayIndex);
                const newDays = isCompleted 
                    ? h.completedDays.filter(d => d !== dayIndex)
                    : [...h.completedDays, dayIndex];
                return { ...h, completedDays: newDays };
            }
            return h;
        }));
    };

    const totalPossible = habits.length * 7;
    const totalCompleted = habits.reduce((acc, h) => acc + h.completedDays.length, 0);
    const progressPercent = totalPossible === 0 ? 0 : Math.round((totalCompleted / totalPossible) * 100);

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-2 border-b border-border-subtle/50 pb-6">
                <span className="material-symbols-outlined text-[32px] text-primary">checklist</span>
                <h2 className="font-h3 text-h3 text-primary">Habit Protocols</h2>
            </div>

            <div className="glass-card p-6 rounded-2xl">
                <div className="flex justify-between items-end mb-4">
                    <h3 className="font-metric text-metric text-on-surface flex items-center gap-2">
                        Weekly Saturation <span className={`material-symbols-outlined ${progressPercent > 50 ? 'text-primary' : 'text-on-surface-variant'}`}>local_fire_department</span>
                    </h3>
                    <span className="font-h3 text-h3 text-primary">{progressPercent}%</span>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-4 overflow-hidden">
                    <div 
                        className="bg-primary h-4 transition-all duration-1000 ease-out" 
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
            </div>

            <div className="glass-card overflow-hidden rounded-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface-container/50 border-b border-border-subtle/50">
                            <th className="p-4 font-label-caps text-label-caps uppercase text-on-surface-variant w-1/3 tracking-widest">Protocol</th>
                            {DAYS.map(day => (
                                <th key={day} className="p-4 text-center font-label-caps text-label-caps uppercase text-on-surface-variant tracking-widest">{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {habits.map(habit => (
                            <tr key={habit.id} className="border-b border-border-subtle/50 last:border-0 hover:bg-surface-bright/20 transition-colors">
                                <td className="p-4 font-body-md font-medium text-on-surface">{habit.name}</td>
                                {DAYS.map((day, idx) => {
                                    const isDone = habit.completedDays.includes(idx);
                                    return (
                                        <td key={idx} className="p-4 text-center">
                                            <button 
                                                onClick={() => toggleHabit(habit.id, idx)}
                                                className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all transform hover:scale-110 mx-auto
                                                    ${isDone ? 'bg-primary border-primary text-background' : 'bg-transparent border-border-subtle hover:border-primary/50'}`}
                                            >
                                                {isDone && <span className="material-symbols-outlined text-[18px]">check</span>}
                                            </button>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HabitsView;
