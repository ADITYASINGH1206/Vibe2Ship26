import React, { useState } from 'react';

const getLast7Days = () => {
    return Array.from({length: 7}).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d;
    });
};

const HabitsView = ({ habits, setHabits }) => {
    const [newHabit, setNewHabit] = useState('');
    const last7Days = getLast7Days();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const handleAddHabit = (e) => {
        e.preventDefault();
        if (newHabit.trim()) {
            setHabits(prev => [...prev, { id: Date.now(), name: newHabit.trim(), completedDays: [] }]);
            setNewHabit('');
        }
    };

    const deleteHabit = (id) => {
        setHabits(prev => prev.filter(h => h.id !== id));
    };

    const toggleHabit = (habitId, dateStr) => {
        setHabits(prev => prev.map(h => {
            if (h.id === habitId) {
                // Wipe out legacy index-based days if they exist to prevent crashes
                const safeDays = (h.completedDays || []).filter(d => typeof d === 'string');
                const isCompleted = safeDays.includes(dateStr);
                const newDays = isCompleted 
                    ? safeDays.filter(d => d !== dateStr)
                    : [...safeDays, dateStr];
                return { ...h, completedDays: newDays };
            }
            return h;
        }));
    };

    const totalPossible = habits.length * 7;
    // Calculate completed just for the visible 7 days for the progress bar
    const totalCompleted = habits.reduce((acc, h) => {
        const safeDays = (h.completedDays || []).filter(d => typeof d === 'string');
        const completedInWindow = last7Days.filter(dateObj => safeDays.includes(dateObj.toISOString().split('T')[0])).length;
        return acc + completedInWindow;
    }, 0);
    
    const progressPercent = totalPossible === 0 ? 0 : Math.round((totalCompleted / totalPossible) * 100);

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-2 border-b border-border-subtle/50 pb-6">
                <span className="material-symbols-outlined text-[32px] text-primary">checklist</span>
                <h2 className="font-h3 text-h3 text-primary">Habit Protocols</h2>
            </div>

            <form onSubmit={handleAddHabit} className="flex gap-4 mb-2">
                <input 
                    type="text" 
                    value={newHabit} 
                    onChange={(e) => setNewHabit(e.target.value)} 
                    placeholder="New habit protocol..." 
                    className="flex-1 bg-surface-container-low text-on-surface border border-border-subtle rounded-xl py-3 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md"
                />
                <button type="submit" className="bg-primary text-background hover:bg-primary/90 px-6 py-3 rounded-xl font-metric transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">add</span> Add Habit
                </button>
            </form>

            <div className="glass-card p-6 rounded-2xl">
                <div className="flex justify-between items-end mb-4">
                    <h3 className="font-metric text-metric text-on-surface flex items-center gap-2">
                        7-Day Saturation <span className={`material-symbols-outlined ${progressPercent > 50 ? 'text-primary' : 'text-on-surface-variant'}`}>local_fire_department</span>
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
                            {last7Days.map(dateObj => (
                                <th key={dateObj.toISOString()} className="p-4 text-center font-label-caps text-[10px] uppercase text-on-surface-variant tracking-widest leading-tight">
                                    {dayNames[dateObj.getDay()]}<br/><span className="opacity-60">{dateObj.getDate()}</span>
                                </th>
                            ))}
                            <th className="p-4 w-12"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {habits.map(habit => (
                            <tr key={habit.id} className="border-b border-border-subtle/50 last:border-0 hover:bg-surface-bright/20 transition-colors">
                                <td className="p-4 font-body-md font-medium text-on-surface">{habit.name}</td>
                                {last7Days.map((dateObj, idx) => {
                                    const dateStr = dateObj.toISOString().split('T')[0];
                                    const safeDays = (habit.completedDays || []).filter(d => typeof d === 'string');
                                    const isDone = safeDays.includes(dateStr);
                                    return (
                                        <td key={idx} className="p-4 text-center">
                                            <button 
                                                onClick={() => toggleHabit(habit.id, dateStr)}
                                                className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all transform hover:scale-110 mx-auto
                                                    ${isDone ? 'bg-primary border-primary text-background shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.4)]' : 'bg-transparent border-border-subtle hover:border-primary/50'}`}
                                            >
                                                {isDone && <span className="material-symbols-outlined text-[18px]">check</span>}
                                            </button>
                                        </td>
                                    );
                                })}
                                <td className="p-4 text-center">
                                    <button 
                                        onClick={() => deleteHabit(habit.id)}
                                        className="text-on-surface-variant hover:text-error transition-colors p-2 rounded-full hover:bg-error/10"
                                        title="Delete Habit"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HabitsView;
