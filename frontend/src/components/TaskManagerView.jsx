import React from 'react';
import InputBar from './InputBar';
import SemanticClusters from './SemanticClusters';

const TaskManagerView = ({ onAnalyze, loadingPhase, masterTaskList }) => {
    return (
        <div className="w-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-2 border-b border-border-subtle/50 pb-6">
                <span className="material-symbols-outlined text-[32px] text-primary">check_circle</span>
                <h2 className="font-h3 text-h3 text-primary">Task Queue & Planning</h2>
            </div>

            <div className="w-full">
                <InputBar onAnalyze={onAnalyze} loadingPhase={loadingPhase} />
            </div>

            <div className="w-full mt-4">
                <h3 className="font-metric text-metric text-on-surface mb-6">Active Clusters</h3>
                {masterTaskList.length > 0 ? (
                    <SemanticClusters tasks={masterTaskList} />
                ) : (
                    <div className="glass-card p-16 flex flex-col items-center justify-center text-center rounded-2xl">
                        <span className="material-symbols-outlined text-[64px] text-on-surface-variant mb-6 opacity-30">account_tree</span>
                        <p className="font-body-lg text-on-surface-variant max-w-md">No active tasks found.<br/>Input raw objectives above to let the system generate an agentic plan.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskManagerView;
