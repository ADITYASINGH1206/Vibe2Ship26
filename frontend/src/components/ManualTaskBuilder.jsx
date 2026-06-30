import React, { useState } from 'react';
import { Plus, X, Send } from 'lucide-react';

const ManualTaskBuilder = ({ onManualCreate }) => {
    const [objective, setObjective] = useState('');
    const [category, setCategory] = useState('Work');
    const [nodes, setNodes] = useState([{ title: '', durationMinutes: 30 }]);

    const addNode = () => {
        setNodes([...nodes, { title: '', durationMinutes: 30 }]);
    };

    const removeNode = (index) => {
        setNodes(nodes.filter((_, i) => i !== index));
    };

    const updateNode = (index, field, value) => {
        const newNodes = [...nodes];
        newNodes[index][field] = value;
        setNodes(newNodes);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!objective.trim()) return;

        const validNodes = nodes.filter(n => n.title.trim());
        if (validNodes.length === 0) return;

        const now = Date.now();
        let currentTime = now;
        
        const tasksToCreate = validNodes.map((n, i) => {
            const startStr = new Date(currentTime).toISOString();
            currentTime += n.durationMinutes * 60000;
            const endStr = new Date(currentTime).toISOString();
            
            return {
                id: Math.random().toString(36).substr(2, 9),
                title: n.title,
                durationMinutes: n.durationMinutes,
                objective,
                category,
                contextCluster: objective,
                scheduledStart: startStr,
                scheduledEnd: endStr
            };
        });

        onManualCreate(tasksToCreate);
        setObjective('');
        setNodes([{ title: '', durationMinutes: 30 }]);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto mb-8 glass-card p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="font-metric text-primary">Manual Cluster Builder</h3>
            
            <div className="flex gap-4">
                <input
                    type="text"
                    required
                    className="flex-1 bg-surface-container-low text-on-surface border border-border-subtle rounded-xl py-3 pl-4 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md"
                    placeholder="Cluster Objective (e.g., Build Backend API)"
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                />
                <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-surface-container-low border border-border-subtle rounded-xl px-4 text-on-surface font-body-md py-3 focus:outline-none"
                >
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Errands">Errands</option>
                </select>
            </div>

            <div className="flex flex-col gap-3 mt-2">
                <p className="font-label-caps text-on-surface-variant text-[10px] tracking-widest uppercase">Nodes ({nodes.length})</p>
                {nodes.map((node, i) => (
                    <div key={i} className="flex items-center gap-3 bg-surface-container/30 p-2 rounded-xl border border-border-subtle/50">
                        <span className="text-on-surface-variant opacity-50 w-4 text-center text-sm">{i+1}</span>
                        <input
                            type="text"
                            required
                            className="flex-1 bg-transparent text-on-surface border-none focus:outline-none focus:ring-0 font-body-md"
                            placeholder="Node Subtask description..."
                            value={node.title}
                            onChange={(e) => updateNode(i, 'title', e.target.value)}
                        />
                        <div className="flex items-center gap-2 border-l border-border-subtle pl-3">
                            <input
                                type="number"
                                min="5"
                                step="5"
                                className="w-16 bg-transparent text-on-surface text-center font-metric outline-none"
                                value={node.durationMinutes}
                                onChange={(e) => updateNode(i, 'durationMinutes', parseInt(e.target.value) || 30)}
                            />
                            <span className="text-on-surface-variant text-xs">min</span>
                        </div>
                        {nodes.length > 1 && (
                            <button type="button" onClick={() => removeNode(i)} className="p-2 text-on-surface-variant hover:text-error transition-colors rounded-lg hover:bg-error/10">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                ))}
                
                <button type="button" onClick={addNode} className="self-start mt-2 text-primary text-sm font-metric hover:text-primary/80 flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg transition-colors">
                    <Plus className="w-4 h-4" /> Add Node
                </button>
            </div>

            <button
                type="submit"
                disabled={!objective.trim() || !nodes.some(n => n.title.trim())}
                className="w-full py-4 bg-primary hover:bg-primary/90 text-background rounded-xl font-metric text-md tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-4"
            >
                <Send className="w-5 h-5 mr-3" />
                Commit Custom Cluster
            </button>
        </form>
    );
};

export default ManualTaskBuilder;
