import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';

const RiskCurveChart = ({ data, pois }) => {
    return (
        <div className="w-full h-80 mt-6 glass-card p-4 rounded-xl border border-primary/20 bg-surface/50">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis 
                        dataKey="time" 
                        stroke="#8e9192" 
                        tick={{ fill: '#8e9192', fontSize: 12 }} 
                        tickMargin={10} 
                        axisLine={false} 
                    />
                    <YAxis 
                        stroke="#8e9192" 
                        tick={{ fill: '#8e9192', fontSize: 12 }} 
                        domain={[0, 100]} 
                        axisLine={false} 
                        tickLine={false} 
                        label={{ value: 'Risk of Failure', angle: -90, position: 'insideLeft', fill: '#8e9192', fontSize: 12 }} 
                    />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1c1b1b', border: '1px solid #4b5563', borderRadius: '8px', color: '#e5e7eb' }} 
                        itemStyle={{ color: '#3b82f6' }} 
                    />
                    <Line 
                        type="monotone" 
                        dataKey="risk" 
                        stroke="#3b82f6" 
                        strokeWidth={3} 
                        dot={false} 
                        activeDot={{ r: 6, fill: '#3b82f6', stroke: '#1c1b1b', strokeWidth: 2 }} 
                        style={{ filter: "drop-shadow(0px 0px 8px rgba(59, 130, 246, 0.8))" }}
                    />
                    
                    {pois.map((poi, index) => (
                        <ReferenceDot 
                            key={index} 
                            x={poi.time} 
                            y={poi.risk} 
                            r={6} 
                            fill="#ef4444" 
                            stroke="#1c1b1b" 
                            strokeWidth={2} 
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

const InsightsView = ({ latestAnalytics, masterTaskList = [] }) => {
    // Generate dynamic chart data based on masterTaskList scheduled days
    const dayMap = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' };
    const baseRisk = latestAnalytics ? Math.round(latestAnalytics.riskScore * 100) : 30;
    
    // Calculate total duration per day of week
    const dailyDurations = { 'Sun': 0, 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0 };
    masterTaskList.forEach(task => {
        if(task.startTime) {
            const date = new Date(task.startTime);
            const dayName = dayMap[date.getDay()];
            dailyDurations[dayName] += parseInt(task.duration || 0);
        }
    });

    // Create a dynamic risk curve based on task load
    const chartData = Object.keys(dailyDurations).map(day => {
        const load = dailyDurations[day];
        // For every 60 mins of tasks, add 15 to the base risk
        let dynamicRisk = baseRisk + (load / 60) * 15;
        return {
            time: day,
            risk: Math.min(100, Math.max(0, Math.round(dynamicRisk)))
        };
    });

    // Identify POIs (Points of Interest) where risk > 70
    const pois = chartData.filter(d => d.risk > 70);

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-2 border-b border-border-subtle/50 pb-6">
                <span className="material-symbols-outlined text-[32px] text-accent-blue">psychology</span>
                <h2 className="font-h3 text-h3 text-primary">Cognitive Insights</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:border-accent-emerald transition-colors">
                    <span className="material-symbols-outlined text-accent-emerald mb-2 text-[28px]">speed</span>
                    <h4 className="font-metric text-3xl text-primary font-bold">94.2%</h4>
                    <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mt-2">Execution Accuracy</p>
                </div>
                <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:border-accent-blue transition-colors">
                    <span className="material-symbols-outlined text-accent-blue mb-2 text-[28px]">verified_user</span>
                    <h4 className="font-metric text-3xl text-primary font-bold">99.9%</h4>
                    <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mt-2">System Stability</p>
                </div>
                <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:border-accent-purple transition-colors">
                    <span className="material-symbols-outlined text-accent-purple mb-2 text-[28px]">auto_graph</span>
                    <h4 className="font-metric text-3xl text-primary font-bold">8.4<span className="text-lg text-on-surface-variant">/10</span></h4>
                    <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mt-2">Optimization Quotient</p>
                </div>
            </div>

            <div className="w-full">
                {latestAnalytics?.recommendation ? (
                    <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-accent-blue via-primary to-accent-purple shadow-[0_0_30px_rgba(0,102,255,0.15)] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue via-primary to-accent-purple blur-2xl opacity-20"></div>
                        <div className="relative bg-surface rounded-2xl p-8 z-10 glass-card">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <span className="material-symbols-outlined text-[120px] text-accent-blue animate-pulse">auto_awesome</span>
                            </div>
                            
                            <h3 className="font-metric text-metric text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple mb-8 flex items-center tracking-wide">
                                <span className="material-symbols-outlined text-[24px] mr-4 text-accent-blue">target</span>
                                AGENTIC STRATEGY
                            </h3>
                            
                            <div className="flex items-start gap-6">
                                <div className="mt-1 bg-accent-blue/10 p-3 rounded-xl border border-accent-blue/30">
                                    <span className="material-symbols-outlined text-[24px] text-accent-blue">bolt</span>
                                </div>
                                <p className="font-body-lg text-on-surface text-lg leading-relaxed font-medium mt-1">
                                    {latestAnalytics.recommendation}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="glass-card p-16 flex flex-col items-center justify-center text-center rounded-2xl">
                        <span className="material-symbols-outlined text-[64px] text-on-surface-variant mb-6 opacity-30">lightbulb</span>
                        <p className="font-body-lg text-on-surface-variant max-w-md">No heuristics generated yet.<br/>Initialize a work cycle to receive AI-powered cognitive recommendations.</p>
                    </div>
                )}
                
                {/* Time Trading Risk Chart */}
                <div className="mt-8">
                    <h3 className="font-metric text-xl text-primary mb-2 flex items-center">
                        <span className="material-symbols-outlined mr-2">monitoring</span>
                        Risk Curve Market Structure
                    </h3>
                    <p className="text-on-surface-variant text-sm mb-4">
                        Timeline analysis of cognitive overload points. Red indicators denote structural breakdown in schedule capacity.
                    </p>
                    <RiskCurveChart data={chartData} pois={pois} />
                </div>
            </div>
        </div>
    );
};

export default InsightsView;
