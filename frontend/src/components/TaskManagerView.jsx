import React, { useState } from 'react';
import InputBar from './InputBar';
import SemanticClusters from './SemanticClusters';
import ManualTaskBuilder from './ManualTaskBuilder';

const TaskManagerView = ({ onAnalyze, loadingPhase, masterTaskList, handleCompleteTask, searchQuery = '', onManualCreate }) => {
    const [creationMode, setCreationMode] = useState('ai'); // 'ai' or 'manual'

    const filteredTasks = masterTaskList.filter(t => 
        (t.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
        (t.objective || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-2 border-b border-border-subtle/50 pb-6">
                <span className="material-symbols-outlined text-[32px] text-primary">check_circle</span>
                <h2 className="font-h3 text-h3 text-primary">Task Queue & Planning</h2>
            </div>

            <div className="flex gap-4 mb-4 justify-center">
                <button onClick={() => setCreationMode('ai')} className={`px-4 py-2 rounded-xl font-metric text-sm transition-colors ${creationMode === 'ai' ? 'bg-primary text-background' : 'bg-surface-container-highest text-on-surface hover:bg-surface-container-high'}`}>AI Agent Builder</button>
                <button onClick={() => setCreationMode('manual')} className={`px-4 py-2 rounded-xl font-metric text-sm transition-colors ${creationMode === 'manual' ? 'bg-primary text-background' : 'bg-surface-container-highest text-on-surface hover:bg-surface-container-high'}`}>Manual Builder</button>
            </div>

            <div className="w-full">
                {creationMode === 'ai' ? (
                    <InputBar onAnalyze={onAnalyze} loadingPhase={loadingPhase} />
                ) : (
                    <ManualTaskBuilder onManualCreate={(tasks) => {
                        onManualCreate(tasks);
                        setCreationMode('ai');
                    }} />
                )}
            </div>

            <div className="w-full mt-4">
                <h3 className="font-metric text-metric text-on-surface mb-6">Active Clusters {searchQuery && <span className="text-primary text-sm font-normal ml-2"> (Filtered by: "{searchQuery}")</span>}</h3>
                {filteredTasks.length > 0 ? (
                    <SemanticClusters tasks={filteredTasks} handleCompleteTask={handleCompleteTask} />
                ) : (
                    <div className="glass-card p-16 flex flex-col items-center justify-center text-center rounded-2xl">
                        <span className="material-symbols-outlined text-[64px] text-on-surface-variant mb-6 opacity-30">
                            {searchQuery ? 'search_off' : 'account_tree'}
                        </span>
                        <p className="font-body-lg text-on-surface-variant max-w-md">
                            {searchQuery ? 'No tasks match your search.' : 'No active tasks found.\nInput raw objectives above to let the system generate an agentic plan.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskManagerView;
