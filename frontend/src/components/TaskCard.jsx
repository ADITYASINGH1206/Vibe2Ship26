import React, { useState } from 'react';
import { Clock, CheckCircle2, Circle } from 'lucide-react';

const TaskCard = ({ task }) => {
    const [completed, setCompleted] = useState(false);

    return (
        <div className={`transition-all rounded-lg p-4 mb-3 border shadow-md transform hover:-translate-y-1 cursor-default flex flex-col
            ${completed ? 'bg-gray-800/40 border-gray-700/50 opacity-60 grayscale' : 'bg-gray-700/60 hover:bg-gray-700/80 border-gray-600'}`}
        >
            <div className="flex items-start justify-between gap-3">
                <button 
                    onClick={() => setCompleted(!completed)}
                    className="mt-1 flex-shrink-0 text-gray-400 hover:text-emerald-400 transition-colors focus:outline-none"
                >
                    {completed ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5" />}
                </button>
                
                <div className="flex-1">
                    <h4 className={`font-medium mb-2 transition-all ${completed ? 'text-gray-500 line-through' : 'text-gray-100'}`}>
                        {task.title}
                    </h4>
                    
                    <div className="flex items-center text-xs text-gray-400">
                        <Clock className={`w-4 h-4 mr-1 ${completed ? 'text-gray-500' : 'text-blue-400'}`} />
                        <span>{task.durationMinutes} mins</span>
                        
                        {task.scheduledStart && (
                            <span className="ml-auto text-gray-500">
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
