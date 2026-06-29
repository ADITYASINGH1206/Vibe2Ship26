import React, { useState } from 'react';
import RiskMeter from './RiskMeter';

const DashboardView = ({ latestAnalytics, masterTaskList, bills, habits }) => {
    // Calculate metrics
    const pendingTasks = masterTaskList.length;
    const pendingBills = bills.filter(b => !b.paid).length;
    
    // Group tasks by objective
    const groupedTasks = masterTaskList.reduce((acc, task) => {
        const obj = task.objective || 'Uncategorized';
        if (!acc[obj]) {
            acc[obj] = { category: task.category, riskScore: latestAnalytics?.riskScore || 0, tasks: [] };
        }
        acc[obj].tasks.push(task);
        return acc;
    }, {});

    const getRiskBadge = (score) => {
        if (score > 0.75) return <span className="px-3 py-1 rounded-full bg-error/10 text-error font-label-caps text-[10px] tracking-wider uppercase border border-error/20">High Risk</span>;
        if (score > 0.40) return <span className="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label-caps text-[10px] tracking-wider uppercase border border-border-subtle">Moderate</span>;
        return <span className="px-3 py-1 rounded-full bg-accent-emerald/10 text-accent-emerald font-label-caps text-[10px] tracking-wider uppercase border border-accent-emerald/20">Healthy</span>;
    };

    const getCategoryIcon = (category) => {
        const cat = (category || '').toLowerCase();
        if (cat === 'work') return { icon: 'database', text: 'text-error' };
        if (cat === 'urgent') return { icon: 'bolt', text: 'text-accent-purple' };
        if (cat === 'personal') return { icon: 'edit_document', text: 'text-accent-blue' };
        return { icon: 'code', text: 'text-on-surface-variant' };
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <section className="mb-12">
                <h2 className="font-h1-mobile md:font-h2 text-h1-mobile md:text-h2 text-primary mb-2">Command Center</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Real-time heuristics and cognitive task processing for your deep work cycle.</p>
            </section>
            
            {/* Top Row: Metrics Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {/* Card: Risk Score */}
                <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <span className="material-symbols-outlined text-on-surface-variant/60" style={{ fontVariationSettings: "'FILL' 1" }}>shield_with_heart</span>
                        <span className="font-label-caps text-label-caps text-on-surface-variant/60">ANALYTIC</span>
                    </div>
                    <div>
                        <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">Risk Score</p>
                        <h3 className="font-h3 text-h3 text-primary">{(latestAnalytics?.riskScore || 0 * 100).toFixed(0)}% <span className="text-on-surface-variant/40 text-metric">AVG</span></h3>
                    </div>
                    <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${(latestAnalytics?.riskScore || 0.12) * 100}%` }}></div>
                    </div>
                </div>

                {/* Card: Pending Tasks */}
                <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <span className="material-symbols-outlined text-on-surface-variant/60" style={{ fontVariationSettings: "'FILL' 1" }}>checklist</span>
                        <span className="font-label-caps text-label-caps text-on-surface-variant/60">QUEUE</span>
                    </div>
                    <div>
                        <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">Pending Tasks</p>
                        <h3 className="font-h3 text-h3 text-primary">{pendingTasks < 10 ? `0${pendingTasks}` : pendingTasks}</h3>
                    </div>
                    <p className="font-label-caps text-label-caps text-accent-blue mt-2">+2 since login</p>
                </div>

                {/* Card: Bills Due */}
                <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <span className="material-symbols-outlined text-on-surface-variant/60" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
                        <span className="font-label-caps text-label-caps text-on-surface-variant/60">FISCAL</span>
                    </div>
                    <div>
                        <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">Bills Due</p>
                        <h3 className="font-h3 text-h3 text-primary">${bills.reduce((sum, b) => !b.paid ? sum + b.amount : sum, 0).toLocaleString()}</h3>
                    </div>
                    <div className="flex items-center gap-1 font-label-caps text-[10px] uppercase tracking-widest text-error mt-2">
                        <span className="material-symbols-outlined text-[14px]">warning</span>
                        {pendingBills} items due soon
                    </div>
                </div>

                {/* Card: Habit Streak */}
                <div className="glass-card p-6 rounded-2xl flex flex-col gap-4 border-primary/20 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                    <div className="flex justify-between items-start">
                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                        <span className="font-label-caps text-label-caps text-primary/60">STREAK</span>
                    </div>
                    <div>
                        <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">Habit Streak</p>
                        <h3 className="font-h3 text-h3 text-primary">14 <span className="text-on-surface-variant/40 text-metric">DAYS</span></h3>
                    </div>
                    <div className="flex gap-1 mt-2">
                        <div className="h-1 flex-1 bg-primary rounded-full"></div>
                        <div className="h-1 flex-1 bg-primary rounded-full"></div>
                        <div className="h-1 flex-1 bg-primary rounded-full"></div>
                        <div className="h-1 flex-1 bg-primary/20 rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Task List (Spans 2 cols on Desktop) */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-metric text-metric text-primary">Active Operations</h3>
                        <button className="text-on-surface-variant hover:text-primary transition-colors font-label-caps uppercase text-[10px] tracking-widest">View All / Edit</button>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        {Object.keys(groupedTasks).length === 0 ? (
                            <div className="glass-card p-12 text-center text-on-surface-variant rounded-2xl">
                                <span className="material-symbols-outlined text-4xl mb-4 opacity-50">all_inbox</span>
                                <p className="font-body-md">No active operations scheduled.</p>
                            </div>
                        ) : (
                            Object.entries(groupedTasks).map(([objective, data]) => {
                                const style = getCategoryIcon(data.category);
                                return (
                                    <div key={objective} className="glass-card rounded-2xl p-6 group transition-all hover:bg-surface-bright/20">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-surface-container-highest border border-border-subtle`}>
                                                    <span className={`material-symbols-outlined ${style.text}`}>{style.icon}</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-metric text-metric text-on-surface group-hover:text-primary transition-colors">{objective}</h4>
                                                    <p className="font-label-caps text-[10px] text-on-surface-variant mt-1 tracking-widest uppercase">{data.category || 'General'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                {getRiskBadge(data.riskScore)}
                                                <button className="opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-primary transition-all p-2 rounded-full hover:bg-surface-container-highest"><span className="material-symbols-outlined text-[18px]">more_vert</span></button>
                                            </div>
                                        </div>
                                        {/* Subtasks inline */}
                                        <div className="pl-[64px] flex flex-col gap-2">
                                            {data.tasks.map(task => (
                                                <div key={task.id} className="text-sm font-body-md text-on-surface-variant flex justify-between items-center bg-surface-container/50 px-3 py-2 rounded-lg border border-border-subtle/50 hover:border-border-subtle transition-colors">
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-1 h-1 rounded-full bg-primary/40"></span>
                                                        <span>{task.title}</span>
                                                    </div>
                                                    <span className="font-label-caps text-[10px] bg-surface-container-highest px-2 py-1 rounded text-on-surface-variant">{task.duration}m</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Right Column: AI Nudge & Additional Context */}
                <div className="flex flex-col gap-6">
                    {/* AI Intervention Card */}
                    <div className="glass-card rounded-2xl p-6 relative overflow-hidden border-accent-blue/30 dark:border-accent-blue/20">
                        <div className="absolute -top-20 -right-20 w-48 h-48 bg-accent-blue/10 blur-3xl rounded-full"></div>
                        <div className="flex items-center gap-2 mb-6 relative z-10">
                            <span className="material-symbols-outlined text-accent-blue animate-pulse">auto_awesome</span>
                            <h3 className="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">Agentic Nudge</h3>
                        </div>
                        <div className="relative z-10 space-y-4">
                            {latestAnalytics ? (
                                <>
                                    <h4 className="font-metric text-metric text-primary leading-tight">Attention: {latestAnalytics.objective}</h4>
                                    <p className="text-on-surface-variant font-body-md text-sm leading-relaxed">{latestAnalytics.recommendation}</p>
                                    <div className="flex flex-col gap-3 mt-6">
                                        <button className="w-full bg-primary text-background hover:bg-primary/90 transition-colors rounded-xl py-3 px-4 font-metric text-sm tracking-wide">Review Optimization</button>
                                        <button className="w-full bg-transparent border border-border-subtle hover:border-on-surface-variant text-on-surface-variant transition-colors rounded-xl py-3 px-4 font-metric text-sm tracking-wide">Dismiss</button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-on-surface-variant font-body-md text-sm italic">System is monitoring your work patterns. Provide task data to generate predictive insights.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mini Data Viz Placeholder */}
                    <div className="glass-card rounded-2xl p-6 flex-1 flex flex-col min-h-[250px]">
                        <h3 className="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase mb-6">Risk Trajectory</h3>
                        <div className="flex-1 flex flex-col items-center justify-center relative">
                             <RiskMeter riskScore={latestAnalytics?.riskScore || 0.15} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
