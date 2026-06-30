import React, { useState } from 'react';
import { Clock, CheckCircle2, Circle } from 'lucide-react';

const TaskCard = ({ task, onComplete }) => {
    const [completed, setCompleted] = useState(false);

    const handleComplete = () => {
        setCompleted(true);
        setTimeout(() => {
            if (onComplete) onComplete(task.id);
        }, 300);
    };

    return (
        <div className={`transition-all rounded-xl p-4 border transform hover:-translate-y-1 cursor-default flex flex-col
            ${completed ? 'bg-surface-container/30 border-border-subtle/50 opacity-60 grayscale' : 'bg-surface-container-high/50 hover:bg-surface-container-high border-border-subtle'}`}
        >
            <div className="flex items-start justify-between gap-3">
                <button 
                    onClick={handleComplete}
                    className="mt-1 flex-shrink-0 text-on-surface-variant hover:text-accent-emerald transition-colors focus:outline-none"
                >
                    {completed ? <CheckCircle2 className="w-5 h-5 text-accent-emerald" /> : <Circle className="w-5 h-5" />}
                </button>
                
                <div className="flex-1">
                    <h4 className={`font-body-md font-bold mb-2 transition-all ${completed ? 'text-on-surface-variant line-through' : 'text-on-surface'}`}>
                        {task.title}
                    </h4>
                    
                    <div className="flex items-center font-label-caps text-[10px] tracking-widest uppercase text-on-surface-variant">
                        <Clock className={`w-4 h-4 mr-2 ${completed ? 'text-on-surface-variant/50' : 'text-accent-blue'}`} />
                        <span>{task.durationMinutes} mins</span>
                        
                        {task.scheduledStart && (
                            <span className="ml-auto text-on-surface-variant bg-surface-container-highest px-2 py-1 rounded">
                                {new Date(task.scheduledStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
