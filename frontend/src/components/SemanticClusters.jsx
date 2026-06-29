import React from 'react';
import TaskCard from './TaskCard';

const SemanticClusters = ({ tasks }) => {
    if (!tasks || tasks.length === 0) {
        return (
            <div className="glass-card p-8 w-full flex items-center justify-center h-64 text-on-surface-variant italic rounded-2xl">
                No active tasks. Awaiting input...
            </div>
        );
    }

    // Group tasks by contextCluster
    const groupedTasks = tasks.reduce((acc, task) => {
        const cluster = task.contextCluster || 'Uncategorized';
        if (!acc[cluster]) acc[cluster] = [];
        acc[cluster].push(task);
        return acc;
    }, {});

    const clusters = Object.keys(groupedTasks);

    return (
        <div className="w-full flex gap-6 overflow-x-auto pb-6 snap-x">
            {clusters.map((clusterName, idx) => (
                <div key={idx} className="glass-card p-5 flex-1 min-w-[320px] max-w-[400px] snap-center flex flex-col h-[550px] rounded-2xl border-t-4 border-t-primary/50 hover:border-t-primary transition-colors">
                    <div className="mb-6 pb-4 border-b border-border-subtle/50 flex justify-between items-center">
                        <h3 className="font-metric text-metric text-on-surface tracking-wide">{clusterName}</h3>
                        <span className="bg-surface-container-highest font-label-caps text-[10px] py-1 px-3 rounded-full text-on-surface-variant tracking-widest">
                            {groupedTasks[clusterName].length} NODES
                        </span>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3 custom-scrollbar">
                        {groupedTasks[clusterName].map((task, taskIdx) => (
                            <TaskCard key={taskIdx} task={task} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SemanticClusters;
