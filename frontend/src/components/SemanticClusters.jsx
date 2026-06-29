import React from 'react';
import TaskCard from './TaskCard';

const SemanticClusters = ({ tasks }) => {
    if (!tasks || tasks.length === 0) {
        return (
            <div className="glass-panel p-8 w-full flex items-center justify-center h-64 text-gray-400 italic">
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
        <div className="w-full flex gap-6 overflow-x-auto pb-4 snap-x">
            {clusters.map((clusterName, idx) => (
                <div key={idx} className="glass-panel p-4 flex-1 min-w-[280px] max-w-[350px] snap-center flex flex-col h-[500px]">
                    <div className="mb-4 pb-3 border-b border-gray-700 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-200 tracking-wide">{clusterName}</h3>
                        <span className="bg-gray-700 text-xs py-1 px-2 rounded-full text-gray-300">
                            {groupedTasks[clusterName].length}
                        </span>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
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
