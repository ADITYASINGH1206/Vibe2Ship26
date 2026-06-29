import React from 'react';
import InputBar from './InputBar';
import SemanticClusters from './SemanticClusters';
import { CheckSquare } from 'lucide-react';

const TaskManagerView = ({ onAnalyze, loadingPhase, masterTaskList }) => {
    return (
        <div className="w-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-2 border-b border-gray-700 pb-4">
                <CheckSquare className="w-8 h-8 text-emerald-400" />
                <h2 className="text-3xl font-bold text-gray-100">Task Manager</h2>
            </div>

            <div className="w-full">
                <InputBar onAnalyze={onAnalyze} loadingPhase={loadingPhase} />
            </div>

            <div className="w-full">
                <h3 className="text-xl font-semibold text-gray-300 mb-6">Active Tasks</h3>
                {masterTaskList.length > 0 ? (
                    <SemanticClusters tasks={masterTaskList} />
                ) : (
                    <div className="glass-panel p-12 flex flex-col items-center justify-center text-center">
                        <CheckSquare className="w-16 h-16 text-gray-600 mb-4" />
                        <p className="text-gray-400 text-lg">No active tasks found.<br/>Drop your raw thoughts above to generate an agentic plan.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskManagerView;
