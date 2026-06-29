import React from 'react';
import { Clock } from 'lucide-react';

const TaskCard = ({ task }) => {
    return (
        <div className="bg-gray-700/60 hover:bg-gray-700/80 transition-all rounded-lg p-4 mb-3 border border-gray-600 shadow-md transform hover:-translate-y-1 cursor-default">
            <h4 className="text-gray-100 font-medium mb-2">{task.title}</h4>
            <div className="flex items-center text-xs text-gray-400">
                <Clock className="w-4 h-4 mr-1 text-blue-400" />
                <span>{task.durationMinutes} mins</span>
                
                {task.scheduledStart && (
                    <span className="ml-auto text-gray-500">
                        {new Date(task.scheduledStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
